Paella Player for Matterhorn
============================
This is the Paella player for Matterhorn bundle.

Development
===========

Branches and tags
-----------------

- To add a feature or fix a bug, create a branch off of **master**. When it is ready to be reviewed and tested, create a pull request from it to master.
- Tags are used to indicate which version of Paella this project is using. When you update the Paella submodule, tag paella-matterhorn with `paella` + the Paella tag + `-` + an hudce Matterhorn release version. i.e. `paella4.1.18/dceoc1.5.1-1.25.0`.

Grunt
-----

Prerequisites:

- Run `npm install`.
- Run `npm install -g grunt-cli` or `sudo npm install -g grunt-cli` if you cannot write to your global node_modules directory.

You need to run `grunt` to build everything. Matterhorn's maven process runs this Gruntfile, too. `server.debug` is the default target because we do not currently minify for production

Among other things, it:

- Copies files from the `dce-paella-extension` module into `submodules/paella` and various other places (see the [Makefile](https://github.com/harvard-dce/paella-matterhorn/blob/using-upstream-paella-directly/Makefile) for details).
- Copies files from `submodules/paella` into `build`. The paella submodule is the [upstream paella](https://github.com/polimediaupv/paella), not a fork.
- Also copies files from `paella-matterhorn/ui` into `build`.
- Concatenates the .less files together.
- Concatenates the files from `paella-matterhorn/javascript` and `paella-matterhorn/plugins` into `paella_matterhorn.js`.
- Concatenates localization json files together.

Running locally
---------------

If you want to run paella-matterhorn locally without deploying it as a jar within matterhorn (and matterhorn.dce.harvard.edu is currently OK), run:

    make run-test-server

This will create a server that will serve local copies of files under `build/` and will serve a canned `episode.json` and `me.json`, but will proxy everything else (like series information) to matterhorn.dce.harvard.edu.

To play a video in the test server, take a URL from production (matterhorn.dce.harvard.edu) and replace the host with localhost:3000. Make sure you use the https protocol.

Paella Player
=============
The Paella (pronounce “paeja”) Player is a HTML5 multistream video player capable of playing multiple audio & video streams synchronously and supporting a number of user plugins. It is specially designed for lecture recordings, like Matterhorn Lectures or Polimedia pills.

By using Paella students can view both the lecture hall and the teacher's screen, get info about the lecture (slides, OCR, series videos, footprints) and interact with the lecture (views, comments). Teachers can also soft edit the lecture to set the start and end point or make breaks in the recording. 

If you want to use Paella player, but does not have a Matterhorn installation, you can use the [standalone](https://github.com/polimediaupv/paella) version of paella.

Main characteristics
====================
- Multi stream video player
- Based in HTML5 and Javascript
- Resize position/size of video windows while playing
- Play/Pause/30 seconds back controls
- Jump anywhere in the video keeping both tracks in sync
- Jump by clicking on the slide list
- High quality slides while seeking
- Can handle progressive download, pseudostreaming and RTMP streaming servers
- Support of .flv and .mp4 files
- Easily change the relative position of presenter and presentation windows
- Native Fullscreen version
- Embeddable
- “Publish to” buttons for Facebook and Twitter
- Captions support
- Comments (experimental)
- Easy skinning
- Easy install
- Soft Editing features: Trimming and breaks
- Support of Chrome, Firefox, Safari and Internet Explorer 9 an 10 browsers
- Compatible with Opencast Matterhorn 1.4
