import axios from '@/api/axios';

export default new class ApiService {
  axios = axios;

  constructor(new_axios = null) {
    this.axios = new_axios || this.axios;
  }

  post(url: string, data?: any, options?: any) {
    return this.axios.post(url, data, options);
  }

  async whoami() {
    const session_data = await this.axios.get('http://localhost:7721/whoami', { withCredentials: true })
      .then((response) => {
        localStorage.session_id = response.data.session_id;
        localStorage.user_id = response.data.userid;
        return response.data;
      });
    return session_data;
  }

  async createSession() {
    const data = await this.axios.post('/create_session')
      .then(() => true)
      .catch(() => false);
    return data;
  }

  async createUser(username: string) {
    const data = await this.axios.post('/create_user', {}, { params: { name: username } })
      .then((user) => {
        localStorage.user_id = user.data.id;
        localStorage.username = user.data.name;
        localStorage.user_avatar = user.data.avatar;
        return user;
      })
      .catch((error) => {
        console.log(error.response.data.detail);
        return false;
      });
    return data;
  }

  async deleteUser() {
    const data = await this.axios.delete('/delete_user')
      .then(() => true)
      .catch((error) => {
        console.log(error.response.data.detail);
        return error.response.status;
      });
    return data;
  }

  async renameUser(new_name: string) {
    const data = await this.axios.patch('/rename_user', {}, {
      params: {
        name: new_name,
      },
    })
      .then(() => {
        localStorage.username = new_name;
        return 'succeed';
      })
      .catch((error) => {
        console.log(error.response.data.detail);
        return error.response.status;
      });
    return data;
  }

  async createRoom(name: string, password?: string) {
    const data = await this.axios.post('/create_room', {}, {
      params: {
        name,
        password,
      },
    })
      .then((room) => {
        localStorage.room_id = room.data.id;
        localStorage.room_name = room.data.name;
        localStorage.host_room = room.data.id;
        localStorage.room_password = password;
        return room;
      })
      .catch((error) => {
        console.log(error.response.data.detail);
        return error.response;
      });
    return data;
  }

  async connectToRoom(room_id: number, password?: string) {
    const data = await this.axios.post('/connect', {}, {
      params: {
        room_id,
        password,
      },
    })
      .then((room) => {
        localStorage.room_id = room_id;
        localStorage.room_name = room.data.name;
        localStorage.room_password = password;
        return room;
      })
      .catch((error) => {
        console.log(error.response.data.detail);
        return error.response;
      });
    return data;
  }

  async disconnect() {
    const data = await this.axios.delete('/disconnect', {})
      .then((response) => {
        localStorage.removeItem('room_id');
        return response;
      })
      .catch((error) => {
        console.log(error.response.data.detail);
        return error.response;
      });
    return data;
  }

  async getRoommates() {
    const data = await this.axios.get('/get_roommates')
      .then((response) => response)
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return data;
  }

  async getPlaylist() {
    const data = await this.axios.get('/get_playlist')
      .then((response) => response)
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return data;
  }

  async deleteSong(queue_num: number) {
    const data = await this.axios.delete('/delete_song', { params: { queue_num } })
      .then((response) => response)
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return data;
  }

  async PlayNext() {
    const data = await this.axios.patch('/playnext')
      .then((response) => response)
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return data;
  }

  async PlayPrev() {
    const data = await this.axios.patch('/playprev')
      .then((response) => response)
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return data;
  }

  async swapSongs(queue_num1: number, queue_num2: number) {
    const data = await this.axios.patch('/swap_songs', {}, {
      params: {
        queue_num1,
        queue_num2,
      },
    })
      .then((response) => response)
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return data;
  }

  async editRoom(room_name?: string, password?: string) {
    const data = await this.axios.patch('/edit_room', {}, {
      params: {
        name: room_name || undefined,
        password: password || undefined,
      },
    })
      .then((response) => response)
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return data;
  }
}();
