import { Client, Entity, Schema, Repository } from 'redis-om'

// initialize redis client
const client = new Client()

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

class Hero extends Entity {
let schema = new Schema(
    Hero,
    {
        name: { type: 'string' },
        attribute: { type: 'string' },
        hitpoints: { type: 'number' },
        strength: { type: 'number' },
        dexterity: { type: 'number' },
        intelligence: { type: 'number' },
    },
    dataStructure: 'JSON'
)
}

export async function createHero(data) {
    await connect()

    const repository = new Repository(schema, client)

    const hero = repository.createEntity(data)

    const id = await repository.save(hero)
}