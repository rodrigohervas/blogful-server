TRUNCATE blogful_comments RESTART IDENTITY CASCADE;

INSERT INTO blogful_comments (text, date_commented, article_id, user_id) 
VALUES 
    ('mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae', '3/30/2019', 1, 9), 
    ('aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo', '4/10/2019', 5, 20), 
    ('lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam', '12/28/2019', 3, 5), 
    ('nullam orci pede venenatis non sodales sed tincidunt eu felis', '4/24/2019', 1, 15), 
    ('pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh', '4/13/2019', 5, 1), 
    ('rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus', '10/13/2019', 6, 20), 
    ('purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at', '4/7/2019', 2, 8), 
    ('proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget', '2/20/2020', 7, 6), 
    ('ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris', '1/18/2020', 4, 5), 
    ('sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed', '4/22/2019', 3, 1), 
    ('amet eleifend pede libero quis orci nullam molestie nibh in lectus', '8/18/2019', 8, 12), 
    ('quisque erat eros viverra eget congue eget semper rutrum nulla', '3/4/2020', 9, 8), 
    ('odio in hac habitasse platea dictumst maecenas ut massa quis', '4/5/2019', 2, 2), 
    ('luctus rutrum nulla tellus in sagittis dui vel nisl duis', '11/1/2019', 5, 14), 
    ('hac habitasse platea dictumst maecenas ut massa quis augue luctus', '5/31/2019', 10, 5), 
    ('vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', '2/9/2020', 4, 7), 
    ('adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at', '7/13/2019', 3, 11), 
    ('nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula', '5/21/2019', 2, 10), 
    ('lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut', '8/21/2019', 1, 5), 
    ('nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam', '6/30/2019', 4, 1);

    --execute: psql -U [dbAdmin] -d [dbName] -f ./seeds/seed.blogful_comments.sql