<template>
  <div>
    <IframePage :url='($route.params.data).replace(/\s*/g,"")'/>
  </div>
  
</template>
<script>
import IframePage from '@/components/IframePage'; 
export default {
 components: {
    IframePage
  },
  data() {
    return {
      
    };
  },
};
</script>

