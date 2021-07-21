<template>
  <div class="table-to-json-wrapper">
    <table border="1" align="center">
      <tr height="40">
        <th v-for="(item, index) in tableDataHead" :key="index" :width="item.width" :colspan="item.colspan ? item.colspan : 1">{{ item.value }}</th>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index" border="1" :style="{'textAlign': item.textAlign ? item.textAlign: 'center'}">
        <td v-if="item.key1" v-html="item.key1.text" :rowspan="item.key1.rowspan ? item.key1.rowspan : 1" :colspan="item.key1.colspan ? item.key1.colspan: 1"></td>
        <td v-if="item.key2" v-html="item.key2.text" :rowspan="item.key2.rowspan ? item.key2.rowspan : 1" :colspan="item.key2.colspan ? item.key2.colspan: 1"></td>
        <td v-if="item.key3" v-html="item.key3.text" :rowspan="item.key3.rowspan ? item.key3.rowspan : 1" :colspan="item.key3.colspan ? item.key3.colspan: 1"></td>
        <td v-if="item.key4" v-html="item.key4.text" :rowspan="item.key4.rowspan ? item.key4.rowspan : 1" :colspan="item.key4.colspan ? item.key4.colspan: 1"></td>
        <td v-if="item.key5" v-html="item.key5.text" :rowspan="item.key5.rowspan ? item.key5.rowspan : 1" :colspan="item.key5.colspan ? item.key5.colspan: 1"></td>
        <td v-if="item.key6" v-html="item.key6.text" :rowspan="item.key6.rowspan ? item.key6.rowspan : 1" :colspan="item.key6.colspan ? item.key6.colspan: 1"></td>
        <td v-if="item.key7" v-html="item.key7.text" :rowspan="item.key7.rowspan ? item.key7.rowspan : 1" :colspan="item.key7.colspan ? item.key7.colspan: 1"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "TableToJson",
    props: {
      tableDataHead: {
        type: Array,
        default: () => {
          return []
        }
      },
      tableData: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/variables";
  table {
    table-layout:fixed;
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    width: 100%;
    overflow: hidden;
  }
  table td, table th
  {
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
    word-wrap:break-word;
  }
  table th
  {
    background-color: $base-color;
    color: white;
  }
  .table-to-json-wrapper{
    table{
      tr{
        td{
          background-color: white;
        }
      }
    }
  }
  table tr:nth-child(odd)
  {
    background: #fff;
  }
  table tr:nth-child(even)
  {
    background: $bg-color;
  }
</style>
