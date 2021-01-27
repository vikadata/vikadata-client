from vika import Vika
import os
import re

vika = Vika("uskF4NhDCsL1a0r1NqPcpQF")
# 通过 datasheetId 来指定要从哪张维格表操作数据。
datasheet = vika.datasheet("dstDmdYrP8aW5lvoon", field_key="name")
# 获取安装包名称
package_name = [node for node in os.listdir('./build') if re.match('.*\.dmg$', node)][0]
print('上传附件中……')
# 上传附件
_file = datasheet.upload_file('../build/%s' % package_name)
print('新增记录中……')
row = datasheet.records.create({
  "更新日志": "* 使用Electron封装",
  "环境": "production",
  "安装包": [_file],
  "系统": "mac"
})
print('操作成功')
