import Chat from './Chat';
import React from 'react';
import { mount, configure, shallow} from 'enzyme';
import ReactDOM from 'react-dom'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Match from './Match.js'
import io from "socket.io-client";
import toJson from 'enzyme-to-json';

const fakeLocalStorage = (function () {
    let store = {};
  
    return {
      getItem: function (key) {
        return store[key] || null;
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      },
      removeItem: function (key) {
        delete store[key];
      },
      clear: function () {
        store = {};
      }
    };
})();

jest.mock("socket.io-client", () => {
    const emit = jest.fn();
    const on = jest.fn();
    const socket = { emit, on };
    return jest.fn(() => socket);
    
  });


describe('chat history', () => {
    beforeAll(() => {
      // socketio.mockClear();
      // socketio().on.mockClear();
      // socketio().emit.mockClear();
        configure({ adapter: new Adapter() });
        Object.defineProperty(window, 'localStorage', {
            value: fakeLocalStorage,
        });
        //now we need to save username and id to local storage 
        window.localStorage.setItem('user', JSON.stringify({
            username: "henry@g.ucla.edu",
            _id: "62058ecec54374bc9112fc2d"
        }))
    })

    it('perform snapshot testing of chat', async ()=> {
        const chat = shallow(<Chat/>);
        expect(chat).toMatchSnapshot();
    })

    it('tests a users match count', async ()=> {
        const chat = shallow(<Chat/>);
        expect(chat.find(Match)).toHaveLength(3);
        expect(chat.find("#chats")).toHaveLength(0);
    })

    it('tests that a user initially has 0 chats', async ()=> {
        const chat = shallow(<Chat/>);
        expect(chat.find("#chats")).toHaveLength(0);
    })

    it('tests that a user can send messages', async ()=> {
        const chat = shallow(<Chat/>);
        chat.find("#name").prop('onKeyDown')({key: 'Enter'})
        expect(chat.find("#chats")).toHaveLength(0);
    })

    it('tests that the message window renders', async () => {
        const chat = shallow(<Chat/>);
        expect(chat.find("#window")).toHaveLength(1);
        expect(chat.find("#current_chats")).toHaveLength(1);
        expect(chat.find("#chat_page")).toHaveLength(1);
    })

    it('tests socket.io', async () => {
      const tmp = io("http://localhost:3000")

      const chat = shallow(<Chat/>);
      expect(tmp.emit).toHaveBeenCalledTimes(0);
      expect(tmp.on).toHaveBeenCalledTimes(0);
        which: 13,
        preventDefault: () => {},
        target: {
          value: ""
        }
      }))
      expect(tmp.emit).toHaveBeenCalledTimes(1);
      expect(tmp.emit).toHaveBeenCalledWith('chat', "{\"room\":\"\",\"sender\":\"62058ecec54374bc9112fc2d\",\"data\":\"\",\"sender_name\":\"henry@g.ucla.edu\"}");
  })
})