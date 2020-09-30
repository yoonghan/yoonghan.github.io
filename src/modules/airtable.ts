import {useState, useEffect} from 'react';
import Airtable from 'airtable';

export enum EnumAirtables {
  ORDER = "Order",
  LOCK_LOG = "Lock Log"
};

export function withAirtable (apiKey:string, baseKey:string) {
  const base = new Airtable({apiKey: apiKey}).base(baseKey);

  const _create = (table: Tables, values: Array<Object>) => {
    base(table).create(values,
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }

  return {
    create: _create
  };
}
