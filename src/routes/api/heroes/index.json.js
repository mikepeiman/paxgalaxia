import {createHero} from '$lib/redis'

export async function get(req, res) {
  try {
    // const { id } = req.params
    // const hero = await createHero(id)
    const id = await createHero(req.body)
    console.log(`🚀 ~ file: index.js ~ line 18 ~ get ~ id `, id)
    res.status(200).json({ id })
    return {
      status: 200,
      body: { hero }
    }
  } catch (error) {
    return {
      body: { error: 'There was a server error' }
    }
  }
}