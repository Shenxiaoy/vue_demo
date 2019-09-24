<template>
	<div class="test">
		我是vue_demo 页
		<span>{{date}}</span>
		<div class="item">
			ss
		</div>
		<hr>
		<br>
		<div class="flutter">
			<div class="w-2-4">我是一个小小的石头</div>
			<div class="w-2-4">我是一个小小的石头</div>
		</div>
		<div class="aspect-box">
			<div class="one">test1</div>
			<div>test2</div>

		</div>
		<router-view />
	</div>
</template>

<script>
import ass from 'static/logo.png'
console.log(process.env.NODE_ENV)
export default {
  name: 'demo',
  data () {
	return {
	  date: 22,
	  src: ass
	}
  }
}
</script>
<style>
	html, body {
		margin: 0;
		padding: 0;
	}
	.test {
		background-color: aliceblue;
		padding: 10px;

	}
	.item {
		background-color: #cccccc;
		box-sizing: border-box;
		width: 100%;
		height: 50px;
	}
	.flutter {
		padding: 20px;
		width: 100%;
		background: slateblue;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.flutter div {
		width: 300px;
		position: relative;
	}
	.aspect-box div {
		width: 180px;
		display: inline-block;
	}
	.aspect-box {
		position: relative;
	}
	.aspect-box {
		aspect-ratio: '16:10';
	}
	.one {
		height: 5rem;
	}



</style>