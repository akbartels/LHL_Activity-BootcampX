const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.connect(() => {
  console.log(`connected to the database!!`);
});


const cohortName = process.argv[2]

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teachers.name;
`, [cohortName])
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.teacher}, ${user.cohort}`);
  })
})
.catch(err => console.error('query error', err.stack));