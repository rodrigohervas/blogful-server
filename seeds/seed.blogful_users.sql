
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