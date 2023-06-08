import axios from "axios";
import { server } from "../../server";
import privateClient from "../../api/client/privateClient";
import privateShop from "../../api/shop/privateShop";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const data = await privateClient.get(`${server}/user/getuser`);
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      // payload: error.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const data = await privateShop.get(`${server}/shop/getSeller`);
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (err) {
    dispatch({
      type: "LoadSellerFail",
      payload: err.message,
    });
  }
};

// user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const data = await privateClient.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.message,
      });
    }
  };

// update user address
export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
    async (dispatch) => {
      try {
        dispatch({
          type: "updateUserAddressRequest",
        });

        const { data } = await axios.put(
          `${server}/user/update-user-addresses`,
          {
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType,
          },
          { withCredentials: true }
        );

        dispatch({
          type: "updateUserAddressSuccess",
          payload: {
            successMessage: "User address updated succesfully!",
            user: data.user,
          },
        });
      } catch (error) {
        dispatch({
          type: "updateUserAddressFailed",
          payload: error.response.data.message,
        });
      }
    };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};
