package main

import (
	"sync"
	"testing"
	"time"
)

func TestConcurrentPublishUnsubscribe(t *testing.T) {
	hub := newHub()
	const clients = 2000
	channels := make([]chan Event, clients)
	for i := range channels {
		channels[i] = hub.subscribe()
	}
	var wg sync.WaitGroup
	start := make(chan struct{})
	wg.Add(2)
	go func() {
		defer wg.Done()
		<-start
		for i := 0; i < clients; i++ {
			hub.publish(Event{RunID: "concurrent"})
		}
	}()
	go func() {
		defer wg.Done()
		<-start
		for _, ch := range channels {
			hub.unsubscribe(ch)
		}
	}()
	close(start)
	wg.Wait()
	for _, ch := range channels {
		for range ch {
		} // Removed clients must still have their channels closed.
	}
	hub.publish(Event{RunID: "after"})
	if history := hub.snapshot(); history[len(history)-1].RunID != "after" {
		t.Fatal("publishing after disconnects did not update history")
	}
}

func TestPublishDoesNotBlockOnSlowClient(t *testing.T) {
	hub := newHub()
	slow := hub.subscribe()
	defer hub.unsubscribe(slow)
	for i := 0; i < cap(slow); i++ {
		hub.publish(Event{RunID: "fill"})
	}
	active := hub.subscribe()
	defer hub.unsubscribe(active)
	done := make(chan struct{})
	go func() { hub.publish(Event{RunID: "latest"}); close(done) }()
	select {
	case <-done:
	case <-time.After(time.Second):
		t.Fatal("full client buffer blocked publishing")
	}
	select {
	case event := <-active:
		if event.RunID != "latest" {
			t.Fatalf("got event %q", event.RunID)
		}
	default:
		t.Fatal("active client missed event")
	}
	if len(slow) != cap(slow) {
		t.Fatal("slow client buffer changed unexpectedly")
	}
}
