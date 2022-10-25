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