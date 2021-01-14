<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" label-position="left">
      <el-form-item label="敏感词">
        <el-input v-model="form.title" placeholder="输入敏感词" />
      </el-form-item>
    </el-form>
    <div style="text-align:center;">
      <el-button type="primary" size="mini" @click="onSubmit">确认</el-button>
      <el-button type="danger" size="mini" @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blockData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: {},
      addVisible: true
    }
  },
  watch: {
    blockData: function(value) {
      this.form = value
    }
  },
  mounted() {
    this.form = this.blockData
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    },
    onCancel() {
      this.$emit('signuped', 'done')
    }
  }
}
</script>
