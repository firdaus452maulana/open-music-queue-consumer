const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylistById (id) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username FROM playlists
        INNER JOIN users ON users.id = owner
        WHERE playlists.id = $1`,
      values: [id]
    }

    const result = await this._pool.query(query)
    console.log(result);


    return result.rows[0]
  }

  async getSongsByPlaylist (playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs
        JOIN songs ON songs.id = song_id
        WHERE playlist_id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    return result.rows
  }
}
 
module.exports = PlaylistsService;