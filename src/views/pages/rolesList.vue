<template>
    {{ name }}
</template>
<script>
import { reactive,toRefs } from 'vue';
export default {
    name: 'Home',
    setup() {
        const data = reactive(
            {
                name: 'Vue222',
            }
        )
        return {...toRefs(data)};
    }
}
</script>