<template lang="pug">
	div
		page-header(:toggle-sidebar="toggleSidebar")

		sidebar(:minimized="miniSidebar")

		section.app-main(:class="{ miniSidebar: miniSidebar }")
			router-view(keep-alive)

</template>

<script>
	import Vue from "vue";

	import PageHeader from "./components/header/index";
	import Sidebar from "./components/sidebar/index";

	import Service from "./service";

	import { mapActions, mapGetters } from "vuex";

	/*
		// Fix Facebook not showing index
		// Test for the ugliness.
		if (window.location.hash == '#_=_'){

			// Check if the browser supports history.replaceState.
			if (history.replaceState) {

				// Keep the exact URL up to the hash.
				var cleanHref = window.location.href.split('#')[0];

				// Replace the URL in the address bar without messing with the back button.
				history.replaceState(null, null, cleanHref);

			} else {

				// Well, you're on an old browser, we can get rid of the _=_ but not the #.
				window.location.hash = '';

			}

		}
	*/
	
	export default {

		/**
		 * Create websocket connection to the root namespace
		 */		
		//mixins: [ MixinsIO() ],

		/**
		 * Load sub-components
		 */
		components: {
			PageHeader,
			Sidebar
		},

		/**
		 * Create app data object
		 * 
		 * TODO: move to vuex state
		 */
		data() {
			return {
				wsReconnecting: false,
				miniSidebar: false
			};
		},

		watch: {
			$lng() {
				console.log("Language updated");
				this.update(this);
			}
		},

		/**
		 * Socket handlers. Every property is an event handler
		 */
		socket: {

			events: {
				/**
				 * Send welcome message after connect
				 */
				connect() {
					console.log("Websocket connected to " + this.$socket.nsp);

					if (this.wsReconnecting)
						// Reload browser if connection established after disconnect
						window.location.reload(true);
					else
						this.$socket.emit("welcome", "Hello! " + navigator.userAgent);
				},

				disconnect() {
					console.log("Websocket disconnected from " + this.$socket.nsp);
					this.wsReconnecting = true;
				},

				error(err) {
					console.error("Websocket error!", err);
				}
			}
		},

		methods: {
			...mapActions("session", [
				"getSessionUser"
			]),

			update: function(vm) {
				if (vm == null)
					return;
				
				let i = vm._watchers.length;
				while (i--)
					vm._watchers[i].update(true);
				
				let children = vm.$children;
				i = children.length;
				while (i--)
					this.update(children[i]);
			},

			toggleSidebar() {
				this.miniSidebar = !this.miniSidebar;
			}
		},

		/**
		 * Application created
		 */
		created() {
			console.log("App started!");
			window.app = this;

			this.getSessionUser();

			// debug
			window.postService = new Service("posts", this);
			window.counterService = new Service("counter", this);
			window.deviceService = new Service("device", this);
			
		}
	};
</script>

<style lang="scss">
	@import "../../scss/style.scss";

</style>