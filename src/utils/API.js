

export default {
    async getEmployee() {
        return fetch("https://randomuser.me/api/?results=200&nat=us")
        .then((res) => 
            res.json()
        );
    }
}