# 表单转为表格
```vue
<template>
  <div>
    <el-form
      :model="form"
      label-position="right"
      label-width="111px"
      class="form"
    >
      <el-row>
        <el-row>
          <el-col :span="20">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="姓名"
                  class="form-item"
                  style="border-top: 0px"
                >
                  <el-input
                    v-model="form.name"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="性别"
                  class="form-item"
                  style="border-top: 0px"
                >
                  <el-input
                    v-model="form.sex"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="出生日期"
                  class="form-item"
                  style="border-top: 0px"
                >
                  <el-input
                    v-model="form.birthday"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名" class="form-item">
                  <el-input
                    v-model="form.name"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" class="form-item">
                  <el-input
                    v-model="form.sex"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生日期" class="form-item">
                  <el-input
                    v-model="form.birthday"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名" class="form-item">
                  <el-input
                    v-model="form.name"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" class="form-item">
                  <el-input
                    v-model="form.sex"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生日期" class="form-item">
                  <el-input
                    v-model="form.birthday"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="参加工作时间" class="form-item">
                  <el-date-picker
                    v-model="form.startWorkDate"
                    type="date"
                    class="form-item-content"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系方式" class="form-item">
                  <el-input
                    v-model="form.phone"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="身份证号" class="form-item">
                  <el-input
                    v-model="form.idNo"
                    class="form-item-content"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <div style="text-align: center">
              <img src="" draggable="false" />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否党委成员" class="form-item">
                <div
                  class="form-item-content"
                  style="background-color: white; text-align: center"
                >
                  <el-radio-group v-model="form.dutyType">
                    <el-radio :label="3">备选项</el-radio>
                    <el-radio :label="6">备选项</el-radio>
                    <el-radio :label="9">备选项</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否纪委成员" class="form-item">
                <div
                  class="form-item-content"
                  style="
                    background-color: white;
                    text-align: center;
                    border-right: 0px;
                  "
                >
                  <el-radio-group v-model="form.dutyType">
                    <el-radio :label="3">备选项</el-radio>
                    <el-radio :label="6">备选项</el-radio>
                    <el-radio :label="9">备选项</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="情况" class="form-item">
              <el-input
                v-model="form.situation"
                type="textarea"
                :rows="8"
                class="form-item-content"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="表格" class="form-item">
              <el-table
                :data="tableData"
                size="mini"
                class="form-item-content"
                style="border-right: 0px"
                border
                :cell-style="{ borderColor: '#000000' }"
              >
                <el-table-column prop="name" align="center"> </el-table-column>
                <el-table-column prop="a" align="center">
                  <el-input v-model="form.environment"></el-input>
                </el-table-column>
                <el-table-column prop="a" align="center">
                  <el-input v-model="form.environment"></el-input>
                </el-table-column>
                <el-table-column prop="a" align="center">
                  <el-input v-model="form.environment"></el-input>
                </el-table-column>
                <el-table-column prop="a" align="center">
                  <el-input v-model="form.environment"></el-input>
                </el-table-column>
                <el-table-column prop="a" align="center">
                  <el-input v-model="form.environment"></el-input>
                </el-table-column>
                <el-table-column prop="a" align="center">
                  <el-input v-model="form.environment"></el-input>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      tableData: [{}, {}, {}],
    }
  },
}
</script>
<style lang="scss" scoped>
.form {
  margin-top: 5px;
  border: 1px solid #4a5d96;
}
.form-item {
  border-top: 1px solid #4a5d96;
  margin: 0px;
}
.form-item-content {
  border-left: 1px solid #4a5d96;
  border-right: 1px solid #4a5d96;
  & ::v-deep .el-input__inner {
    border: 0;
    text-align: center;
  }
  & ::v-deep .el-textarea__inner {
    border: 0;
  }
  ::v-deep .el-table__header-wrapper .el-table__cell {
    border-right: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
  }
}
</style>
```