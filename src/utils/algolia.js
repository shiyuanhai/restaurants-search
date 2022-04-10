import algoliasearch from 'algoliasearch';

const {
  REACT_APP_ALGOLIA_APP_ID: appId,
  REACT_APP_ALGOLIA_API_KEY: apiKey,
  REACT_APP_ALGOLIA_RESTAURANTS_INDEX_NAME: restaurantsIndexName,
} = process.env;

export const searchClient = algoliasearch(
  appId,
  apiKey,
);
export const restaurantsIndex = searchClient.initIndex(restaurantsIndexName);

export async function addRestaurant(restaurant) {
  try {
    const res = await restaurantsIndex.saveObject(restaurant, {'autoGenerateObjectIDIfNotExist': true}).wait();
    return {
      success: true,
      data: res,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: e.toString(),
    };
  }
}

export async function deleteRestaurant(restaurantObjectId) {
  try {
    const res = await restaurantsIndex.deleteObject(restaurantObjectId).wait();
    return {
      success: true,
      data: res
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: e.toString(),
    };
  }
}
