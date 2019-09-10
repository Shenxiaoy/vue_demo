<template>
	<div class="test">
		我是vue_demo 页
		<span>{{date}}</span>
	</div>
</template>

<script>
export default {
  name: 'demo',
  data () {
	return {
	  date: new Date()
	}
  }
}
</script>
<style>
	.test {
		color: bisque;
	}
</style>