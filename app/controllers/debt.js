module.exports = class DebtsController {
  /**
  * Constructor
  * param @userId String
  */
  constructor (userId) {
    this.userId = userId;
  };

  /**
  * Index
  * Get all debts for the current user
  * return Array
  */
  index () {}

  /**
  * Show
  * Get debt by id
  * param @id Number
  * return Object
  */
  show (id) {}

  /**
  * Save
  * Save debt from current user
  * param @debt Object
  */
  save (debt) {}

  /**
  * Remove
  * Delete debts by ids
  * param @ids Array
  */
  remove (ids) {}
}
