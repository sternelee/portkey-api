import { sqliteTable, index, text } from 'drizzle-orm/sqlite-core';

import { relations } from 'drizzle-orm';
import { auditSchema } from './audit';
import * as users from './users';
import { ApiConfig, AppContext } from '../index';
import { isAdmin, isAdminOrEditor } from '../config-helpers';

export const tableName = 'configs';

export const route = 'configs';

export const definition = {
  id: text('id').primaryKey(),
  title: text('title'),
  userId: text('userId'),
  apiKey: text('apiKey'),
  config: text('config', { mode: 'json' }).$type<any>(),
};

export const table = sqliteTable(
  tableName,
  {
    ...definition,
    ...auditSchema,
  },
  (table) => {
    return {
      userIdIndex: index('configUserIdIndex').on(table.userId),
    };
  }
);

export const relation = relations(table, ({ one }) => ({
  user: one(users.table, {
    fields: [table.userId],
    references: [users.table.id],
  }),
}));

export const access: ApiConfig['access'] = {
  operation: {
    read: true,
    create: isAdminOrEditor,
  },
  filter: {
    // if a user tries to update a feed and isn't the user that created the feed the update won't happen
    update: (ctx: AppContext) => {
      if (isAdmin(ctx)) {
        return true;
      } else {
        const user = ctx.get('user');
        if (user?.userId) {
          // Return filter so update doesn't happen if userId doesn't match
          return {
            userId: user.userId,
          };
        } else {
          return false;
        }
      }
    },
    delete: (ctx: AppContext) => {
      if (isAdmin(ctx)) {
        return true;
      } else {
        const user = ctx.get('user');
        if (user?.userId) {
          // Return filter so update doesn't happen if userId doesn't match
          return {
            userId: user.userId,
          };
        } else {
          return false;
        }
      }
    },
  },
  fields: {
    userId: {
      update: false,
    },
  },
};
export const hooks: ApiConfig['hooks'] = {
  beforeOperation: (ctx, operation, _, data) => {
    if (operation === 'read') {
      if (data && ctx.get('user')?.userId) {
        data.filters = {
          userId: {
            $eq: ctx.get('user').userId,
          },
        };
      }
    }
  },
  resolveInput: {
    create: (ctx, data) => {
      if (ctx.get('user')?.userId) {
        data.userId = ctx.get('user').userId;
      }
      return data;
    },
    update: (ctx, id, data) => {
      if (ctx.get('user')?.userId) {
        data.userId = ctx.get('user').userId;
      }
      return data;
    },
  },
};
export const fields: ApiConfig['fields'] = {
  tags: {
    type: 'string[]',
  },
};
