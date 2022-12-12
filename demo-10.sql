SELECT * FROM userInfo
SELECT * FROM userInfo WHERE username = '张三'
INSERT INTO userInfo SET username="李四", PASSWORD='123456'
SELECT * FROM userInfo LIMIT 5, 1

SELECT * FROM book_class
INSERT INTO book_class SET nameClass = '魔幻'
UPDATE book_class SET nameClass = '变态' WHERE id = 1
UPDATE book_class SET STATUS = 0 WHERE id = 1

SELECT * FROM userInfo LEFT JOIN book_class ON userInfo.id = book_class.id 
SELECT * FROM userInfo AS u LEFT JOIN book_class AS b ON u.id = b.id

SELECT * FROM user_article WHERE STATUS = 0 AND userId = 1 LIMIT 0, 10
INSERT INTO user_article SET article_title = '《江南》', article_body = '江南可采莲，莲叶何田田。
　　鱼戏莲叶间。
　　鱼戏莲叶东，鱼戏莲叶西。
　　鱼戏莲叶南，鱼戏莲叶北',
article_Type = '言情',userId = 1

insert into user_article set article_title = '《长歌行》',article_body = '青青园中葵，朝露待日曦。
　　阳春布德泽，万物生光辉。
　　常恐秋节至，焜黄华叶衰。
　　百川东到海，何时复西归。
　　少壮不努力，老大徒伤悲。',article_Type = '言情',userId = 1

select * from user_article
update user_article set status = 0 where status = 1
delete from user_article where id = 16

insert into book_class set nameClass = '搞笑'


select * from imageWZ
insert into imageWZ set imageUrl = '/image/阿轲/阿轲-6.jpg', imageType = '阿轲'
select * from imageWZ where imageType = '上官婉儿' limit 0, 1
 
select * from userInfo
select * from userInfo where id = 8