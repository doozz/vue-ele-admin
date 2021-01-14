<template>
  <div class="app-container">
    <div class="table-top">
      <el-row>
        <el-input v-model="block" placeholder="敏感词句" style="width: 300px;" size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" prop="id" />
      <el-table-column label="词句" prop="title" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleEdit(row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="query.page"
      :limit.sync="query.size"
      @pagination="fetchData"
    />
    <el-dialog :visible.sync="addVisible" title="敏感词" top="10vh">
      <Add :block-data="blockData" @signuped="getsign" />
    </el-dialog>
  </div>

</template>

<script>
import Pagination from '@/components/Pagination'
import { getList } from '@/api/table'
import Add from './components/Add'
export default {
  components: {
    Pagination,
    Add
  },
  data() {
    return {
      list: [],
      listLoading: true,
      block: '',
      addVisible: false,
      blockData: {},
      total: 0,
      query: {
        page: 1,
        size: 20
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.query)
      this.listLoading = true
      getList().then(response => {
        this.total = response.data.total
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleAdd() {
      this.blockData = {
        id: '',
        title: ''
      }
      this.addVisible = true
    },
    handleEdit(row) {
      this.blockData = Object.assign({}, row)
      this.addVisible = true
    },
    getsign() {
      this.addVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  .el-input {
    width: 160px;
  }
}
</style>
