require('dotenv').config();
let mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const { Schema } = mongoose;
mongoose.set('useFindAndModify', false);

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {console.log("db is connected.")})

const personSchema = new Schema({
  name: String,
  age:  Number,
  favoriteFoods: [ String ]
});

const Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  let me = new Person({name: "jacky", age: 26, favoriteFoods: ['mango', 'fried chicken']});

  me.save((err, doc) => {
    if (err) return console.log(err)
    done(null, doc)
  })  
};

const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople.forEach(peopleInfo => {
    let people = new Person(peopleInfo);

    people.save((err, doc) => {
      if (err) return console.log(err)
      done(null, doc)
    })
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, person) => {
    if (err) console.log(err)
    done(null, person)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, person) => {
    if (err) console.log(err)
    done(null, person)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) console.log(err)
    done(null, person)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, person) => {
    if (err) console.log(err)

    person.favoriteFoods.push(foodToAdd)

    person.save((err, doc) => {
      if (err) console.log(err)
      done(null, doc)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, doc) => {
    if (err) console.log(err)
    done(null, doc)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, doc) => {
    if (err) console.log(err)
    done(null, doc)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, docs) => {
    if (err) console.log(err)
    done(null, docs)
  })
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
        .sort('name')
        .limit(2)
        .select(['name', 'favoriteFoods'])
        .exec((err, docs) => done(null, docs))
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
