import { LowSync } from 'lowdb';
import { LocalStorage } from 'lowdb/browser'

const defaultData = {
    todos: [
      'Julian und Eddi einen Kaffee bringen',
      'Bewertung dalassen'
    ]
  };

const adapter = new LocalStorage('db');
export const db = new LowSync(adapter, defaultData);