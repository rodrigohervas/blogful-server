TRUNCATE blogful_comments RESTART IDENTITY CASCADE;
TRUNCATE blogful_articles RESTART IDENTITY CASCADE;
TRUNCATE blogful_users RESTART IDENTITY CASCADE;

INSERT INTO blogful_users (fullname, username, password, nickname)
VALUES
  ('Erich Horley', 'ehorley0', '7OhwOw', 'Erich'), 
  ('Dorey Salman', 'dsalman1', 'H46eAkF3a8b', 'Dorey'), 
  ('Massimo Zavattieri', 'mzavattieri2', 'ho8rHTe', 'Massimo'), 
  ('Douglass Savage', 'dsavage3', 'Xb23WMMe', 'Douglass'), 
  ('Hynda Rhymes', 'hrhymes4', 'dRJLbz', 'Hynda'), 
  ('Anastasia Fleming', 'afleming5', '5qXde9wVye', 'Anastasia'), 
  ('Veradis Talby', 'vtalby6', 'V8g3dKMKN', 'Veradis'), 
  ('Bettine Srawley', 'bsrawley7', 'E1j9aB0GCj9', 'Bettine'), 
  ('Robbie Mawdsley', 'rmawdsley8', 'g1iVBB7', 'Robbie'), 
  ('Latrena Cardenoso', 'lcardenoso9', '0ibXCW', 'Latrena'), 
  ('Averyl Tesimon', 'atesimona', 'UtUxD7', 'Averyl'), 
  ('Glenden Houlison', 'ghoulisonb', 'bKVQDRP', 'Glenden'), 
  ('Marni English', 'menglishc', 'uaFlMJn', 'Marni'), 
  ('Junia Havoc', 'jhavocd', 'vJEXaM', 'Junia'), 
  ('Naoma Frantz', 'nfrantze', 'rPq4NGWCKW', 'Naoma'), 
  ('Grant Fogg', 'gfoggf', 'JkgoaMW9x2w', 'Grant'), 
  ('Eimile Rillett', 'erillettg', '5dAwP349', 'Eimile'), 
  ('Maurine Daspar', 'mdasparh', 'ih8XFIRbrY6', 'Maurine'), 
  ('Therine Whyberd', 'twhyberdi', 'UwA2Q5', 'Therine'), 
  ('Kelly Bome', 'kbomej', 'EOA72ot3a', 'Kelly'); 

    --execute: psql -U [dbAdmin] -d [dbName] -f ./seeds/seed.blogful_users.sql

INSERT INTO blogful_articles (title, style, content, author)
VALUES
  ('First post!', 'Interview',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?', 1),
  ('Second post!', 'How-to',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.', 2),
  ('Third post!', 'News',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.', 3),
  ('Fourth post', 'How-to',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consequuntur. Cum quo ea vero, fugiat dolor labore harum aut reprehenderit totam dolores hic quaerat, est, quia similique! Aspernatur, quis nihil?', 3),
  ('Fifth post', 'News',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet soluta fugiat itaque recusandae rerum sed nobis. Excepturi voluptas nisi, labore officia, nobis repellat rem ab tempora, laboriosam odio reiciendis placeat?', 2),
  ('Sixth post', 'Listicle',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 3),
  ('Seventh post', 'Listicle',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, voluptatum nam culpa minus dolore ex nisi recusandae autem ipsa assumenda doloribus itaque? Quos enim itaque error fuga quaerat nesciunt ut?', 4),
  ('Eigth post', 'News',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur sequi sint beatae obcaecati voluptas veniam amet adipisci perferendis quo illum, dignissimos aspernatur ratione iusto, culpa quam neque impedit atque doloribus!', 5),
  ('Ninth post', 'Story',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos architecto repellat, in amet soluta exercitationem perferendis eius perspiciatis praesentium voluptate nisi deleniti eaque? Rerum ea quisquam dolore, non error earum?', 6),
  ( 'Tenth post', 'How-to',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestiae accusamus veniam consectetur tempora, corporis obcaecati ad nisi asperiores tenetur, autem magnam. Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam?', 9);

    --execute: psql -U [dbAdmin] -d [dbName] -f ./seeds/seed.blogful_articles.sql

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