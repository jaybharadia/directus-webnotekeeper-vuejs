<template>
    <div>
        <div
            style="
                display: flex;
                justify-content: space-between;
                align-items: center;
            "
        >
            <p
                @click="logout"
                style="
                    text-decoration: underline;
                    cursor: pointer;
                    text-align: right;
                "
            >
                Logout
            </p>

            <button
                @click="$router.push({ name: 'upsert', params: { id: '+' } })"
            >
                ⊕
            </button>
        </div>
        <p v-if="loading">Loading...</p>
        <div
            v-else
            style="background: #222; padding: 16px; border-radius: 24px"
        >
            <li
                v-for="note in notes"
                :key="`note-${note.id}`"
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                "
            >
                <div>
                    <a :href="note.website"> {{ note.website }}</a>
                    <div>
                        {{ note.note }}
                    </div>
                </div>

                <button @click="remove(note.id)">🗑️</button>
            </li>
        </div>
    </div>
</template>

<script>
import { readItems, deleteItem } from "@directus/sdk";
import Cookies from "js-cookie";

export default {
    inject: ["directus"],
    data() {
        return {
            notes: null,
            loading: false,
        };
    },
    created() {
        console.log("inside home page");
        this.getNotes();
    },
    methods: {
        async remove(id) {
            await this.directus.request(deleteItem("notes", id));
            this.getNotes();
        },
        logout() {
            /**
             * SDK Issue https://github.com/directus/directus/discussions/10027
             * Therefore clearing cookie
             */

            Cookies.remove("directus_auth");
            this.$router.push({ name: "login" });
        },
        async getNotes() {
            this.loading = true;
            this.notes = await this.directus.request(readItems("notes"));
            this.loading = false;
        },
    },
};
</script>
