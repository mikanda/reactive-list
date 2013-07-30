
build: components index.js lib/reactive-list.js \
	lib/model-wrapper.js lib/index-adapter.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

test: build
	# Open test/index.html in your browser

.PHONY: clean test
