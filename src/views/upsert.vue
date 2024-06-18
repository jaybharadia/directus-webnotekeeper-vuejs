<template>
    <div>
        <textarea
            rows="10"
            v-model="note"
            placeholder="Notes are great way to store helpful information to access later. Get Started..."
        ></textarea>
        <button @click="save">👍 Done</button>
    </div>
</template>

<script>
import { createItem, readItem, updateItem } from "@directus/sdk";
export default {
    inject: ["directus"],
    data() {
        return {
            note: "",
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        isCreate() {
            return this.$route.params.id === "+";
        },
        isEdit() {
            return !this.isCreate;
        },
    },
    created() {
        if (this.isEdit) {
            this.get();
        }
    },
    methods: {
        async get() {
            // Edit mode
            const { note } = await this.directus.request(
                readItem("notes", this.id)
            );
            this.note = note;
        },
        async save() {
            if (this.isEdit) {
                await this.directus.request(
                    updateItem("notes", this.id, {
                        note: this.note,
                    })
                );
            } else {
                const [tab] = await chrome.tabs.query({
                    active: true,
                    lastFocusedWindow: true,
                });

                const { origin } = new URL(tab.url);
                await this.directus.request(
                    createItem("notes", {
                        note: this.note,
                        website: origin,
                    })
                );
            }

            this.$router.push({ name: "home" });
        },
    },
};
</script>
