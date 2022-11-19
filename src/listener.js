class Listener {
    constructor(playlistService, mailSender) {
      this._playlistService = playlistService;
      this._mailSender = mailSender;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
      try {
        const { userId, playlistId, targetEmail } = JSON.parse(message.content.toString());
        
        const playlist = await this._playlistService.getPlaylists(userId);
        const songs = await this._playlistService.getSongsByPlaylist(playlistId);
        playlist.songs = songs

        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlists));
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
   
  module.exports = Listener;