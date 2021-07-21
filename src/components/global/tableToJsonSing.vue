<template>
  <div class="table-to-json-wrapper">
    <table border="1" align="center">
      <tr height="40">
        <th v-for="(item, index) in tableDataHead" :key="index" :width="item.width" :colspan="item.colspan && index===0 ? 2: 1">{{ item.value }}</th>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index" border="1" :style="{'textAlign': item.textAlign ? item.textAlign: 'center'}">
        <td v-if="item.key1" v-html="item.key1" :colspan="item.colspan ? 5 : 1"></td>
        <td v-if="item.key2" v-html="item.key2"></td>
        <td v-if="item.key3" v-html="item.key3"></td>
        <td v-if="item.key4" v-html="item.key4"></td>
        <td v-if="item.key5" v-html="item.key5"></td>
        <td v-if="item.key6" v-html="item.key6"></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "TableToJsonSing",
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
    font-weight: bolder;
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
  table .textAlign {
    text-align: initial;
  }
</style>
