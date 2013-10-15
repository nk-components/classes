
build: index.js components
	@component build --dev

components:
	@component install

clean:
	rm -fr build components

test: build
	@open test/index.html

.PHONY: clean test
