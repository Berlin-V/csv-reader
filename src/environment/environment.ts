import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'spanner',
  name: process.env.SPANNER_INSTANCE_NAME,
  projectId: process.env.GCP_PROJECT_ID,
  instanceId: process.env.SPANNER_INSTANCE_ID,
  databaseId: 'sb-postgres', //?? process.env.SPANNER_DATABASE
  logging: false,
  entities: [],
  synchronize: false,
};

export const environment = {
  port: process.env.PORT ?? 3000,
  dataSources: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => await new DataSource(databaseConfig).initialize(),
    },
  ],
} as const;
