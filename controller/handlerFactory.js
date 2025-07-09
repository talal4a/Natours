import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import APiFeatures from '../utils/apiFeatures.js';

/**
 * Create a document in the database
 * @param {Model} Model - The Mongoose model
 * @returns {Function} - Express middleware function
 */
export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * Get a single document by ID
 * @param {Model} Model - The Mongoose model
 * @param {Array} popOptions - Options for populating referenced documents
 * @returns {Function} - Express middleware function
 */
export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * Update a document by ID
 * @param {Model} Model - The Mongoose model
 * @returns {Function} - Express middleware function
 */
export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * Delete a document by ID
 * @param {Model} Model - The Mongoose model
 * @returns {Function} - Express middleware function
 */
export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

/**
 * Get all documents
 * @param {Model} Model - The Mongoose model
 * @returns {Function} - Express middleware function
 */
export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const features = await new APiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitsFields()
      .paginate();
    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc,
      },
    });
  });
