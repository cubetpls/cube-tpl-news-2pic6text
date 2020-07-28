<div class="cubebox-tmpl-wrap">
  {{#if loading}}
    <div class="loading"></div>
  {{/if}}

  <div class="carousel-box">
    <Carousel
      interval="3000"
      width="368"
      height="100"
      btns="hover"
      class="cube-test">
      {{#list carouselList as item by item_index}}
        <Carousel.Item>
        <div class="carousel-item">
          {{#list item as item2 by item2_index}}
            <a href="{{item2.url}}" target="_blank">
              <img src="{{item2.pic | clipImage:'180_100_75'}}" width="180" height="100" alt="">
              <p class="ext">
                <span class="bg"></span>
                <span class="title">{{item2.title}}</span>
              </p>
            </a>
          {{/list}}
        </div>
        </Carousel.Item>
      {{/list}}
    </Carousel>
  </div>

  <div class="infor-box">
    <ul>
      {{#list textList as item by item_index}}
      <li class="infor-item">
        <a href="{{item.url}}" target="_blank">{{item.title}}</a>
      </li>
      {{/list}}
    </ul>
  </div>
</div>