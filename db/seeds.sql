INSERT INTO departments (name)
VALUES
  ('Sales'), 
  ('Research and Development'), 
  ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Manager', 100000, 1), 
  ('Sales Associate', 75000, 1),
  ('Sales Assistant', 50000, 1),
  ('R&D Manager', 100000, 2), 
  ('R&D Associate', 75000, 2),
  ('R&D Assistant', 50000, 2),
  ('Engineering Manager', 100000, 3), 
  ('Engineering Associate', 75000, 3),
  ('Engineering Assistant', 50000, 3);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, null), 
  ('Virginia', 'Woolf', 1, null),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 2, 2),
  ('Katherine', 'Mansfield', 3, 1),

  ('Dora', 'Carrington', 4, null),
  ('Edward', 'Bellamy', 5, 6),
  ('Montague', 'Summers', 5, 6),
  ('Octavia', 'Butler', 6, 6),

  ('Austin', 'Davis', 7, null),
  ('Heidi', 'Moreland', 8, 10),
  ('Nathan', 'Nelson', 9, 10);
