import { DataSource } from 'typeorm';

export const trancuateTables = async (connection: DataSource) => {
    const entities = connection.entityMetadatas; // this provide me the list of all table inside this DataSources

    for (const entity of entities) {
        const repositry = connection.getRepository(entity.name);
        await repositry.clear();
    }
};
