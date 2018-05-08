# something_intresting
A Web Project inspired by radio garden

# 技术说明
因为radio garden本来的3D地图服务在中国太慢了，因此本项目采用百度地图来提供地图服务

#数据库schema
### 说明：所有表的id字段都没用auto_increment

### 表名:channels
| 列名	| 类型	| 描述	|
| ----- | ----- | ----- |
| id | int | 整数类型的频道ID |
| c_id | 字符串 | 字符串类型的独一无二的频道ID |
| name | 字符串 | 频道名称 |
| p_id | int | 频道对应的place的ID， 也就是城市ID |
| url | string | 频道直播地址, todo |

### 表名:countries
| 列名 | 类型 | 描述 |
| ----- | ----- | ----- |
| id | int | 整数类型的频道ID |
| code | 字符串 | 字符串类型的国家代码, 例如US， JP等 |
| name | 字符串 | 国家或者地区名 |

### 表名: places
| 列名 | 类型 | 描述 |
| ----- | ----- | ----- |
| id | int | 整数类型的地名ID，也就是城市ID |
| p_id | string | 字符串类型的城市ID |
| city | string | 城市名 |
| country | int | 城市对应的国家ID |
| geo | json --> string | 字符传类型的地理坐标，使用是需要改为json |
| channelCount | int | 对应城市的频道数量 |
| timezone | int | 城市对应的时区 |