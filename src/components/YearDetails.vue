<template>
<div class="container">
    <h3>Seasons Details</h3>
    {{ $route.params.id }}
    <p>Select for the details.</p>
         <router-link tag="button" class="btn btn-lg btn-primary" 
            :to="{name: 'Standigns',
            query: {
                selectedYear: $route.params.id
            }}">Standigns {{ this.id }}
        </router-link>
    
    
      
</div>
        
    
</template>

<script>
export default {
    props: ['id'],

}


</script>
