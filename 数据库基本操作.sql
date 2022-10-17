-- 查询选择的表名
SELECT * FROM usernameTable

-- 向 usernameTable 表内插入数据
INSERT INTO usernameTable VALUES ('一十', 45, 9)
INSERT INTO usernameTable (NAME, age) VALUES ('十二', 29)

-- 查询指定列名称
SELECT NAME FROM usernameTable

-- 更新表中的数据
UPDATE usernameTable SET NAME = '十三', age = 18 WHERE id = 10

-- 删除表内的数据
DELETE FROM usernameTable WHERE id = 10

SELECT * FROM usernameTable WHERE id > 5
SELECT * FROM usernameTable WHERE NAME != '老八' AND id != 1
SELECT * FROM usernametable WHERE NAME = '张三' OR id = 2

-- 将 id 的值以降序的方式进行显示
SELECT * FROM usernametable ORDER BY id DESC

-- 先以年龄降序的形式排序，在以名称升序的形式进行排序
SELECT * FROM usernametable ORDER BY age DESC, NAME ASC

-- 计算 id 小于等于 5 的数据条数
SELECT COUNT(*) FROM usernametable WHERE id <= 5

-- 为查询出来的表设置别名 
SELECT COUNT(*) AS num FROM usernametable

SELECT age AS '年龄' FROM usernametable ORDER BY age 