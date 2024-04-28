<template>
    <div>
        HELLO
        {{ notes }}

        <button @click="getNotes()">Get Notes</button>
        <button @click="getToken()">Get Token</button>
    </div>
</template>

<script>
import {
    createDirectus,
    rest,
    authentication,
    login,
    createUser,
    readItems,
} from "@directus/sdk";
import Cookies from "js-cookie";
const directus = createDirectus("https://directus-supabase.onrender.com")
    .with(
        authentication("cookie", {
            credentials: "include",
            autoRefresh: true,
            storage: {
                get() {
                    if (Cookies.get("directus_auth"))
                        return JSON.parse(Cookies.get("directus_auth"));
                    else return null;
                },
                set(data) {
                    console.log("🚀 ~ set ~ data:", data);
                    Cookies.set("directus_auth", JSON.stringify(data));
                },
            },
        })
    )
    .with(rest());

export default {
    data() {
        return {
            notes: null,
        };
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            const token = await directus.getToken();
            console.log("🚀 ~ init ~ token:", token);
            if (!token)
                await directus.login("jay.p.bharadia@gmail.com", "Dev@7$pan");

            this.getNotes();
        },
        async getNotes() {
            this.notes = await directus.request(readItems("notes"));
            console.log("🚀 ~ testing:", this.notes);
        },
        getToken() {
            console.log("getToken", directus.getToken());
        },
    },
};

// console.log("🚀 ~ auth:", auth);

// const result = await directus.request(
//     createUser({
//         first_name: "Testing",
//         last_name: "beta",
//         email: "jay.p.bharaida+10000@gmail.com",
//         password: "1234567890",
//         role: "1c005600-202d-429c-81bb-452a70aec7e1", // Customer
//     })
// );
// console.log("🚀 ~ result:", result);
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
