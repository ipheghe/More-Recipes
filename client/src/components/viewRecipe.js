import React from "react";
import { UserNavHeader } from "../views/index";
import Egusi from './images/egusi_soup.jpg';
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

class ViewRecipe extends React.Component {
  /**
   * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
   * 
   * @param {component} <MainHeader/> - The landing page main header navigation.
   * @param {component} <Footer/> - The landing page footer navigation.
   */
  render() {
    return (
      <div>
        <UserNavHeader />
        <div className="banner-background">
          <div className="recipe-background">
            <div className="container">
              <div className="row recipe-top">
                <section className="col-md-6 title-area">
                  <h3>Egusi Soup</h3>
                  <h6>Recipe Details</h6>
                  <br></br>
                  <br></br>
                  <div>
                    <p>This is an african native soup from Nigeria.It is so delicious and sumptuous.</p>
                  </div>
                  <br></br>
                  <div>
                    <p>300<span><b>Views |</b></span></p>
                    <p>100<span><b>Reviews |</b></span></p>
                    <p>200<span><b>Upvotes |</b></span></p>
                    <p>60<span><b>Downvotes</b></span></p>
                  </div>
                </section>
                <section className="col-md-6 recipe-image">
                  <img className="img-thumbnail" src={Egusi} alt="egusi soup image" />
                </section>
              </div>
              <hr></hr>
              <div className="recipe-button">
                <button type="button" className="btn btn-success btn-lg" id="downvote">Favorite</button>
                <button type="button" className="btn btn-success  btn-lg" id="upvote">Upvote</button>
                <button type="button" className="btn btn-success  btn-lg" id="downvote">Downvote</button>
              </div>
              <br></br>
              <div>
                <h3> Ingredients</h3>
              </div>
              <hr></hr>
              <div className="row recipe-ingredients">
                <section className="col-md-6">
                  <div>
                    <ul>
                      <li><i className="fa fa-dot-circle-o"></i><span>500g Egusi (Melon) seeds</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>3 cooking spoons red palm oil</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Beef: best cut and Shaki (cow tripe)</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Fish: dry fish and stockfish</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>2 tablespoons ground crayfish</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Fish: dry fish and stockfish</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>2 tablespoons ground crayfish</span></li>
                    </ul>
                  </div>
                </section>
                <section className="col-md-6">
                  <div>
                    <ul>
                      <li><i className="fa fa-dot-circle-o"></i><span>Pepper and Salt (to taste)</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Vegetable: Nigerian pumpkin leaves</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>3 small stock cubes</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Fish: dry fish and stockfish</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>1 small ogiri okpei (optional)</span></li>
                    </ul>
                  </div>
                </section>
              </div>
              <br></br>
              <div>
                <h3> Directions</h3>
              </div>
              <hr></hr>
              <div className="row recipe-ingredients">
                <section className="col-md-12">
                  <div>
                    <ul>
                      <li><i className="fa fa-dot-circle-o"></i><span>Pour the red palm oil into a dry pot and set on the stove to heat. As soon as the oil melts, add the ground egusi and start frying. If the oil is not congealed, add the egusi as soon as the oil is translucent. Mix the ground egusi with oil till every grain of egusi turns yellow.</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Start stirring the egusi on low to medium heat. Keep stir-frying for about 10 minutes.</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Add the meat/fish stock (water from cooking the fish and meat) little by little while still stirring the egusi. So you add a bit of the stock, stir-fry for some time, add another, stir-fry and so on. When the stock is exhausted and you feel that the soup is still too thick, you can start adding hot water in the same way till you get the consistency you want. If your choice of vegetable is bitter leaf, add it at this time.</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Cover the pot and cook for 20 minutes, stirring at intervals. Also, top up the water when necessary. If you don't stir it, it will burn. It takes 30 minutes to cook egusi properly else the soup will not taste nice to someone with authentic Nigerian taste buds. Also, egusi that is not cooked long enough may cause upset stomach. The egusi is done when you notice that the oil has separated from the mix.</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Once you are happy that it is done, add the ground crayfish and pepper. Stir and add the Nigerian pumpkin leaves or spinach (alternative).</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Stir very well and add the cooked stockfish, shaki and meat.</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Add salt if necessary. If it is too thick, add some water to bring it to a consistency you like.</span></li>
                      <li><i className="fa fa-dot-circle-o"></i><span>Cover and leave to simmer and it is done!</span></li>
                    </ul>
                  </div>
                </section>
              </div>
              <br></br>
              <div>
                <h3> Reviews</h3>
              </div>
              <hr></hr>
              <div className="recipe-review">
                <section>
                  <div>
                    <textarea className="form-control form-rounded" rows="3"></textarea>
                  </div>
                  <br></br>
                  <div>
                    <button type="button" className="btn btn-success">Add Review</button>
                  </div>
                </section>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewRecipe;
