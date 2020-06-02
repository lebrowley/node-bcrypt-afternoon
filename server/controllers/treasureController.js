module.exports = {
    dragonTreasure: async (req, res) => {
        const dbInstance = req.app.get('db')

        const treasure = await dbInstance.get_dragon_treasure(1)
        return res.status(200).send(treasure)
    },

    getUserTreasure: async (req, res) => {
        const dbInstance = req.app.get('db')

        const userTreasure = await dbInstance.get_user_treasure([req.session.user.id])
        console.log(userTreasure)
        return res.status(200).send(userTreasure)
    },

    addUserTreasure: async (req, res) => {
        const {treasureURL} = req.body,
              {id} = req.session.user,
              dbInstance = req.app.get('db')
        
        const userTreasure = await dbInstance.add_user_treasure([treasureURL, id])
        return res.status(200).send(userTreasure)      
    }
}