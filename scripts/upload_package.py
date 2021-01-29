from vika import Vika
import os, re, sys

_, env, arch = sys.argv
print('arch:', arch)

vika = Vika("uskF4NhDCsL1a0r1NqPcpQF")
# 通过 datasheetId 来指定要从哪张维格表操作数据。
datasheet = vika.datasheet("dstDmdYrP8aW5lvoon", field_key="name")
# 获取安装包名称
if arch == 'mac' or arch == 'm1':
  package_name = [node for node in os.listdir('./build') if re.match('.*\.dmg$', node)][0]
else:
  package_name = [node for node in os.listdir('./build') if re.match('.*\.exe$', node)][0]

print('upload_path: ', 's3://vika-client-download/%s/%s/' % (env, arch))
os.system('aws s3 cp ./build/%s s3://vika-client-download/%s/' % (package_name,  env))
os.system('aws s3 cp ./build/latest-%s.yml s3://vika-client-download/%s/' % (arch, env))
os.system('aws s3 cp ./build/%s.blockmap s3://vika-client-download/%s/' % (package_name,  env))

  
print('上传到维格表附件中……')
# 上传附件
_file = datasheet.upload_file('./build/%s' % package_name)
print('新增记录中……')
new_arch = arch
if arch == 'm1':
  new_arch = 'arm'
row = datasheet.records.create({
  "更新日志": "请填写...",
  "环境": env,
  "安装包": [_file],
  "系统": new_arch,
})
print('操作成功')
