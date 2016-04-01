(function(App) {

  'use strict';

  App.View.FullScreen = App.Core.View.extend({

    initialize: function(settings) {
      this.fullscreenBtn = document.getElementById(settings.fullscreenBtn);
      this.container = document.getElementById(settings.container);
      this.isFullscreen = false;
      this.fullscreenCount = 0;
      if(this.fullscreenBtn){
        this.setListeners();
      }
    },

    setListeners: function() {
      var fullscreenEvents = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange';
      $(document).on(fullscreenEvents, _.bind(this.fullscreenWatcher, this));
      this.fullscreenBtn.addEventListener('click', _.bind(this.toggleFullscreen, this), false);
    },

    fullscreenWatcher: function() {
      console.log('watched');
      var isEnteringFullscreen = this.fullscreenCount % 2 === 0;
      this.fullscreenCount++;

      if(isEnteringFullscreen && !this.getFullscreen()) {
        this.enableFullscreen();
      } else if(!isEnteringFullscreen && this.getFullscreen()) {
        this.disableFullscreen();
      }
    },

    enableFullscreen: function() {
      console.log('enabled fs');
      this.setFullscreen(true);
      this.container.classList.add('is-fullscreen');
      this.fullscreenBtn.textContent = 'Exit Full screen';
    },

    disableFullscreen: function() {
      console.log('disabled fs');
      this.setFullscreen(false);
      this.container.classList.remove('is-fullscreen');
      this.fullscreenBtn.textContent = 'Full screen';
    },


    toggleFullscreen: function() {
      if (!this.container.fullscreenElement && !this.container.mozFullScreenElement && !this.container.webkitFullscreenElement && !this.container.msFullscreenElement && !document.webkitIsFullScreen) {

        if (this.container.requestFullscreen) {
          this.container.requestFullscreen();
        } else if (this.container.msRequestFullscreen) {
          this.container.msRequestFullscreen();
        } else if (this.container.mozRequestFullScreen) {
          this.container.mozRequestFullScreen();
        } else if (this.container.webkitRequestFullscreen) {
          this.container.webkitRequestFullscreen();
        }

        this.fullscreenBtn.textContent = 'Exit Full screen';

      } else {

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }

        this.fullscreenBtn.textContent = 'Full screen';

      }

      this.container.classList.toggle('is-fullscreen');

    },

    getFullscreen: function() {
      return this.isFullscreen;
    },

    setFullscreen: function(bool) {
      this.isFullscreen = bool;
    }

  });

}).call(this, this.App);
