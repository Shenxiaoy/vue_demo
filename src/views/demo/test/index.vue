<template>
	<div class="test">
		test
		<van-button type="default">默认按钮</van-button>
		<van-button type="primary">主要按钮</van-button>
		<van-button type="info">信息按钮</van-button>
		<van-button type="warning">警告按钮</van-button>
		<van-button type="danger">危险按钮</van-button>
	</div>
</template>

<script>
import Button from 'vant/lib/button'
import 'vant/lib/button/style'
export default {
  name: "test",
  data () {
    return {

	}
  },
  components: {
    [Button.name]: Button
  }
}
</script>

<style scoped>
	.test {
		color: red;
	}
</style>