<template>
  <div class="w-full h-full">
    <!--  -->
    <BaseComponent :height="heightAuto" :isShowPad="false">
      <template v-slot:header>
        <div class="flex items-center text-left gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H18V1H16V3H8V1H6V3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM19 19H5V9H19V19ZM19 7H5V5H19M7 11H12V16H7"
              fill="var(--color-icon-df)"
            />
          </svg>

          <div class="txt_medium_14">
            <!--  -->
            Today
          </div>
        </div>
      </template>
      <div class="w-full h-[460px]">
        <div class="h-[50%] w-full relative p-4">
          <div class="flex items-center">
            <p class="">
              {{ formatDateLocalizedConvert(tideDataRender.datetime) }}
            </p>
          </div>
          <div class="absolute right-0 top-0 p-3">
            <div class="relative">
              <div
                class="w-[60px] h-[60px] bg-red-500 bor-radios-full p-2 button-rotate"
              >
                <div class="items-center" v-if="convertTimeRender()">
                  <div class="flex justify-center">
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_4690_15669)">
                        <path
                          d="M9.4452 0.881654C9.26797 0.974121 9.09074 1.15135 8.99827 1.33629C8.85186 1.62139 8.84416 1.78321 8.84416 4.58806V7.53931L7.86554 6.5607C7.31844 6.02901 6.77134 5.53585 6.63264 5.4665C6.10096 5.20451 5.41516 5.42797 5.14546 5.95966C4.95282 6.33723 4.95282 6.65316 5.13775 7.02303C5.32269 7.37749 9.1755 11.2149 9.51455 11.3844C9.83048 11.5385 10.1695 11.5385 10.4855 11.3844C10.8245 11.2149 14.6773 7.37749 14.8622 7.02303C15.0472 6.65316 15.0472 6.33723 14.8545 5.95966C14.5848 5.42797 13.899 5.20451 13.3674 5.4665C13.2287 5.53585 12.6816 6.02901 12.1422 6.5607L11.1558 7.53931V4.58806C11.1558 1.78321 11.1481 1.62139 11.0017 1.33629C10.7166 0.773775 10.0231 0.573429 9.4452 0.881654Z"
                          fill="white"
                        />
                        <path
                          d="M0.351562 11.9809C0.1875 12.0669 0.0390625 12.3052 0.0390625 12.4888C0.0390625 12.7778 0.5 13.4536 0.949219 13.8208C1.25 14.0708 1.79688 14.3403 2.20312 14.4458C2.625 14.5513 3.30859 14.5552 3.73438 14.4458C4.16016 14.3403 4.69141 14.0669 5.03125 13.7856L5.3125 13.5474L5.59766 13.7856C5.93359 14.0669 6.46484 14.3403 6.89062 14.4458C7.31641 14.5513 7.99609 14.5513 8.42188 14.4458C8.84766 14.3403 9.37891 14.0669 9.71875 13.7856L10 13.5474L10.2852 13.7856C10.6211 14.0669 11.1523 14.3403 11.5781 14.4458C12.0039 14.5513 12.6836 14.5513 13.1094 14.4458C13.5352 14.3403 14.0664 14.0669 14.4062 13.7856L14.6875 13.5474L14.9727 13.7856C15.125 13.9145 15.4141 14.102 15.6055 14.1958C16.1016 14.438 16.4687 14.5239 17.0312 14.5239C17.5937 14.5239 17.9648 14.438 18.457 14.1958C19.0273 13.9145 19.4258 13.5435 19.7734 12.9731C19.9766 12.6372 20.0039 12.4263 19.875 12.2036C19.7109 11.9224 19.3945 11.8364 19.1016 11.9849C18.9883 12.0434 18.9102 12.1333 18.793 12.3247C18.4102 12.9888 17.7812 13.352 17.0312 13.352C16.2812 13.352 15.6523 12.9888 15.2695 12.3247C14.9375 11.7583 14.4375 11.7583 14.1055 12.3247C13.7227 12.9888 13.0938 13.352 12.3438 13.352C11.5938 13.352 10.9648 12.9888 10.582 12.3247C10.25 11.7583 9.75 11.7583 9.41797 12.3247C9.03516 12.9888 8.40625 13.352 7.65625 13.352C6.90625 13.352 6.27734 12.9888 5.89453 12.3247C5.5625 11.7583 5.0625 11.7583 4.73047 12.3247C4.34766 12.9888 3.71875 13.352 2.96875 13.352C2.21875 13.352 1.58984 12.9888 1.20703 12.3247C0.976562 11.9341 0.671875 11.8091 0.351562 11.9809Z"
                          fill="white"
                        />
                        <path
                          d="M0.45341 14.9144C0.195598 14.9964 0.00809795 15.2972 0.0510667 15.5667C0.0901292 15.805 0.383098 16.2425 0.742473 16.594C1.27372 17.1175 1.85185 17.3987 2.60966 17.4964C3.47294 17.6058 4.4495 17.2972 5.09404 16.7073L5.31279 16.5081L5.53544 16.7112C6.012 17.137 6.62529 17.4105 7.29716 17.4964C8.16044 17.6058 9.137 17.2972 9.78154 16.7073L10.0003 16.5081L10.2229 16.7112C10.6995 17.137 11.3128 17.4105 11.9847 17.4964C12.8479 17.6058 13.8245 17.2972 14.469 16.7073L14.6878 16.5081L14.9104 16.7112C15.5745 17.305 16.5276 17.6058 17.3909 17.4964C18.1487 17.3987 18.7268 17.1175 19.2581 16.594C19.5862 16.2698 19.887 15.8362 19.9417 15.6058C20.012 15.3245 19.8089 14.9886 19.5237 14.9144C19.219 14.8323 19.0003 14.9573 18.7854 15.3323C18.5042 15.8206 17.9964 16.1839 17.4143 16.305C16.594 16.4808 15.719 16.0784 15.2737 15.3245C15.0745 14.9808 14.8518 14.844 14.5901 14.8909C14.4065 14.9261 14.2464 15.0706 14.0979 15.3323C13.8167 15.8206 13.3089 16.1839 12.7268 16.305C11.9065 16.4808 11.0315 16.0784 10.5862 15.3245C10.387 14.9808 10.1643 14.844 9.90263 14.8909C9.71904 14.9261 9.55888 15.0706 9.41044 15.3323C9.12919 15.8206 8.62138 16.1839 8.03935 16.305C7.21904 16.4808 6.34404 16.0784 5.89872 15.3245C5.6995 14.9808 5.47685 14.844 5.21513 14.8909C5.03154 14.9261 4.87138 15.0706 4.72294 15.3323C4.34794 15.9847 3.53935 16.4144 2.81279 16.3401C2.10575 16.2737 1.60966 15.9417 1.16044 15.2503C1.09013 15.1448 0.992473 15.0237 0.937785 14.9847C0.816692 14.8948 0.605754 14.8675 0.45341 14.9144Z"
                          fill="white"
                        />
                        <path
                          d="M0.324422 17.9609C0.0900473 18.1016 -0.0115152 18.375 0.0783286 18.6406C0.152547 18.8711 0.480672 19.332 0.750204 19.5859C1.53927 20.3398 2.57052 20.6406 3.61739 20.4258C4.17989 20.3086 4.73458 20.0234 5.12911 19.6445L5.3127 19.4687L5.5002 19.6445C6.03927 20.168 6.87911 20.5 7.65645 20.5C8.4338 20.5 9.27364 20.168 9.81661 19.6445L10.0002 19.4687L10.1877 19.6445C10.7268 20.168 11.5666 20.5 12.344 20.5C13.1213 20.5 13.9611 20.168 14.5041 19.6445L14.6877 19.4687L14.8752 19.6445C15.2658 20.0234 15.8205 20.3086 16.383 20.4258C17.4299 20.6406 18.4611 20.3398 19.2502 19.5859C19.5275 19.3242 19.8596 18.8555 19.926 18.625C20.0432 18.2344 19.7775 17.8828 19.3635 17.8828C19.1291 17.8828 18.969 18 18.7815 18.3125C18.3205 19.0898 17.4299 19.4727 16.5666 19.2695C16.0471 19.1445 15.5588 18.7812 15.2815 18.3125C15.094 17.9961 14.9377 17.8828 14.6877 17.8828C14.4377 17.8828 14.2815 17.9961 14.094 18.3125C13.633 19.0898 12.7424 19.4727 11.8791 19.2695C11.3596 19.1445 10.8713 18.7812 10.594 18.3125C10.4065 17.9961 10.2502 17.8828 10.0002 17.8828C9.7502 17.8828 9.59395 17.9961 9.40645 18.3125C8.94552 19.0898 8.05489 19.4727 7.19161 19.2695C6.67208 19.1445 6.1838 18.7812 5.90645 18.3125C5.71895 17.9961 5.5627 17.8828 5.3127 17.8828C5.0627 17.8828 4.90645 17.9961 4.71895 18.3125C4.25802 19.0898 3.36739 19.4727 2.50411 19.2695C1.98458 19.1445 1.4963 18.7812 1.21895 18.3125C1.13302 18.1719 1.00802 18.0195 0.937704 17.9687C0.773641 17.8594 0.500204 17.8516 0.324422 17.9609Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4690_15669">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p class="txt_regular_10">
                    {{ convertTimeTideLive(convertTimeRender().datetime) }}
                  </p>
                  <p class="txt_regular_10">
                    {{ formatTideHeightSingle(convertTimeRender().height) }}
                  </p>
                </div>
              </div>
              <div class="flex justify-center">
                <div
                  class="absolute items-center cursor-pointer txt_regular_14 bor-live"
                >
                  <p class="txt_regular_10">Live Tide</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-[120px] absolute bottom-8 left-0 pl-2 pr-8">
            <ChartTideBarCurrent></ChartTideBarCurrent>
          </div>
        </div>
        <div class="h-[50%] w-full pl-16 pr-16">
          <div
            class="items-center w-full"
            v-for="(itemExtreme, index) in extremesDataRender"
            :key="index"
          >
            <div
              class="flex justify-between items-center w-full pad-small-tide"
            >
              <div class="flex items-center gap-2 w-[200px]">
                <svg
                  v-if="itemExtreme.state === 'LOW TIDE'"
                  width="18"
                  height="19"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_4690_15669)">
                    <path
                      d="M9.4452 0.881654C9.26797 0.974121 9.09074 1.15135 8.99827 1.33629C8.85186 1.62139 8.84416 1.78321 8.84416 4.58806V7.53931L7.86554 6.5607C7.31844 6.02901 6.77134 5.53585 6.63264 5.4665C6.10096 5.20451 5.41516 5.42797 5.14546 5.95966C4.95282 6.33723 4.95282 6.65316 5.13775 7.02303C5.32269 7.37749 9.1755 11.2149 9.51455 11.3844C9.83048 11.5385 10.1695 11.5385 10.4855 11.3844C10.8245 11.2149 14.6773 7.37749 14.8622 7.02303C15.0472 6.65316 15.0472 6.33723 14.8545 5.95966C14.5848 5.42797 13.899 5.20451 13.3674 5.4665C13.2287 5.53585 12.6816 6.02901 12.1422 6.5607L11.1558 7.53931V4.58806C11.1558 1.78321 11.1481 1.62139 11.0017 1.33629C10.7166 0.773775 10.0231 0.573429 9.4452 0.881654Z"
                      fill="white"
                    />
                    <path
                      d="M0.351562 11.9809C0.1875 12.0669 0.0390625 12.3052 0.0390625 12.4888C0.0390625 12.7778 0.5 13.4536 0.949219 13.8208C1.25 14.0708 1.79688 14.3403 2.20312 14.4458C2.625 14.5513 3.30859 14.5552 3.73438 14.4458C4.16016 14.3403 4.69141 14.0669 5.03125 13.7856L5.3125 13.5474L5.59766 13.7856C5.93359 14.0669 6.46484 14.3403 6.89062 14.4458C7.31641 14.5513 7.99609 14.5513 8.42188 14.4458C8.84766 14.3403 9.37891 14.0669 9.71875 13.7856L10 13.5474L10.2852 13.7856C10.6211 14.0669 11.1523 14.3403 11.5781 14.4458C12.0039 14.5513 12.6836 14.5513 13.1094 14.4458C13.5352 14.3403 14.0664 14.0669 14.4062 13.7856L14.6875 13.5474L14.9727 13.7856C15.125 13.9145 15.4141 14.102 15.6055 14.1958C16.1016 14.438 16.4687 14.5239 17.0312 14.5239C17.5937 14.5239 17.9648 14.438 18.457 14.1958C19.0273 13.9145 19.4258 13.5435 19.7734 12.9731C19.9766 12.6372 20.0039 12.4263 19.875 12.2036C19.7109 11.9224 19.3945 11.8364 19.1016 11.9849C18.9883 12.0434 18.9102 12.1333 18.793 12.3247C18.4102 12.9888 17.7812 13.352 17.0312 13.352C16.2812 13.352 15.6523 12.9888 15.2695 12.3247C14.9375 11.7583 14.4375 11.7583 14.1055 12.3247C13.7227 12.9888 13.0938 13.352 12.3438 13.352C11.5938 13.352 10.9648 12.9888 10.582 12.3247C10.25 11.7583 9.75 11.7583 9.41797 12.3247C9.03516 12.9888 8.40625 13.352 7.65625 13.352C6.90625 13.352 6.27734 12.9888 5.89453 12.3247C5.5625 11.7583 5.0625 11.7583 4.73047 12.3247C4.34766 12.9888 3.71875 13.352 2.96875 13.352C2.21875 13.352 1.58984 12.9888 1.20703 12.3247C0.976562 11.9341 0.671875 11.8091 0.351562 11.9809Z"
                      fill="white"
                    />
                    <path
                      d="M0.45341 14.9144C0.195598 14.9964 0.00809795 15.2972 0.0510667 15.5667C0.0901292 15.805 0.383098 16.2425 0.742473 16.594C1.27372 17.1175 1.85185 17.3987 2.60966 17.4964C3.47294 17.6058 4.4495 17.2972 5.09404 16.7073L5.31279 16.5081L5.53544 16.7112C6.012 17.137 6.62529 17.4105 7.29716 17.4964C8.16044 17.6058 9.137 17.2972 9.78154 16.7073L10.0003 16.5081L10.2229 16.7112C10.6995 17.137 11.3128 17.4105 11.9847 17.4964C12.8479 17.6058 13.8245 17.2972 14.469 16.7073L14.6878 16.5081L14.9104 16.7112C15.5745 17.305 16.5276 17.6058 17.3909 17.4964C18.1487 17.3987 18.7268 17.1175 19.2581 16.594C19.5862 16.2698 19.887 15.8362 19.9417 15.6058C20.012 15.3245 19.8089 14.9886 19.5237 14.9144C19.219 14.8323 19.0003 14.9573 18.7854 15.3323C18.5042 15.8206 17.9964 16.1839 17.4143 16.305C16.594 16.4808 15.719 16.0784 15.2737 15.3245C15.0745 14.9808 14.8518 14.844 14.5901 14.8909C14.4065 14.9261 14.2464 15.0706 14.0979 15.3323C13.8167 15.8206 13.3089 16.1839 12.7268 16.305C11.9065 16.4808 11.0315 16.0784 10.5862 15.3245C10.387 14.9808 10.1643 14.844 9.90263 14.8909C9.71904 14.9261 9.55888 15.0706 9.41044 15.3323C9.12919 15.8206 8.62138 16.1839 8.03935 16.305C7.21904 16.4808 6.34404 16.0784 5.89872 15.3245C5.6995 14.9808 5.47685 14.844 5.21513 14.8909C5.03154 14.9261 4.87138 15.0706 4.72294 15.3323C4.34794 15.9847 3.53935 16.4144 2.81279 16.3401C2.10575 16.2737 1.60966 15.9417 1.16044 15.2503C1.09013 15.1448 0.992473 15.0237 0.937785 14.9847C0.816692 14.8948 0.605754 14.8675 0.45341 14.9144Z"
                      fill="white"
                    />
                    <path
                      d="M0.324422 17.9609C0.0900473 18.1016 -0.0115152 18.375 0.0783286 18.6406C0.152547 18.8711 0.480672 19.332 0.750204 19.5859C1.53927 20.3398 2.57052 20.6406 3.61739 20.4258C4.17989 20.3086 4.73458 20.0234 5.12911 19.6445L5.3127 19.4687L5.5002 19.6445C6.03927 20.168 6.87911 20.5 7.65645 20.5C8.4338 20.5 9.27364 20.168 9.81661 19.6445L10.0002 19.4687L10.1877 19.6445C10.7268 20.168 11.5666 20.5 12.344 20.5C13.1213 20.5 13.9611 20.168 14.5041 19.6445L14.6877 19.4687L14.8752 19.6445C15.2658 20.0234 15.8205 20.3086 16.383 20.4258C17.4299 20.6406 18.4611 20.3398 19.2502 19.5859C19.5275 19.3242 19.8596 18.8555 19.926 18.625C20.0432 18.2344 19.7775 17.8828 19.3635 17.8828C19.1291 17.8828 18.969 18 18.7815 18.3125C18.3205 19.0898 17.4299 19.4727 16.5666 19.2695C16.0471 19.1445 15.5588 18.7812 15.2815 18.3125C15.094 17.9961 14.9377 17.8828 14.6877 17.8828C14.4377 17.8828 14.2815 17.9961 14.094 18.3125C13.633 19.0898 12.7424 19.4727 11.8791 19.2695C11.3596 19.1445 10.8713 18.7812 10.594 18.3125C10.4065 17.9961 10.2502 17.8828 10.0002 17.8828C9.7502 17.8828 9.59395 17.9961 9.40645 18.3125C8.94552 19.0898 8.05489 19.4727 7.19161 19.2695C6.67208 19.1445 6.1838 18.7812 5.90645 18.3125C5.71895 17.9961 5.5627 17.8828 5.3127 17.8828C5.0627 17.8828 4.90645 17.9961 4.71895 18.3125C4.25802 19.0898 3.36739 19.4727 2.50411 19.2695C1.98458 19.1445 1.4963 18.7812 1.21895 18.3125C1.13302 18.1719 1.00802 18.0195 0.937704 17.9687C0.773641 17.8594 0.500204 17.8516 0.324422 17.9609Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4690_15669">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <svg
                  v-else
                  width="18"
                  height="19"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_4690_15678)">
                    <path
                      d="M9.4452 11.1057C9.26797 11.0132 9.09074 10.836 8.99827 10.651C8.85186 10.3659 8.84416 10.2041 8.84416 7.39925V4.44799L7.86554 5.42661C7.31844 5.9583 6.77134 6.45146 6.63264 6.52081C6.10096 6.7828 5.41516 6.55933 5.14546 6.02765C4.95282 5.65007 4.95282 5.33414 5.13775 4.96427C5.32269 4.60981 9.1755 0.772413 9.51455 0.602889C9.83048 0.448777 10.1695 0.448777 10.4855 0.602889C10.8245 0.772413 14.6773 4.60981 14.8622 4.96427C15.0472 5.33414 15.0472 5.65007 14.8545 6.02765C14.5848 6.55933 13.899 6.7828 13.3674 6.52081C13.2287 6.45146 12.6816 5.9583 12.1422 5.42661L11.1558 4.44799V7.39925C11.1558 10.2041 11.1481 10.3659 11.0017 10.651C10.7166 11.2135 10.0231 11.4139 9.4452 11.1057Z"
                      fill="white"
                    />
                    <path
                      d="M0.351562 11.7309C0.1875 11.8169 0.0390625 12.0552 0.0390625 12.2388C0.0390625 12.5278 0.5 13.2036 0.949219 13.5708C1.25 13.8208 1.79688 14.0903 2.20312 14.1958C2.625 14.3013 3.30859 14.3052 3.73438 14.1958C4.16016 14.0903 4.69141 13.8169 5.03125 13.5356L5.3125 13.2974L5.59766 13.5356C5.93359 13.8169 6.46484 14.0903 6.89062 14.1958C7.31641 14.3013 7.99609 14.3013 8.42188 14.1958C8.84766 14.0903 9.37891 13.8169 9.71875 13.5356L10 13.2974L10.2852 13.5356C10.6211 13.8169 11.1523 14.0903 11.5781 14.1958C12.0039 14.3013 12.6836 14.3013 13.1094 14.1958C13.5352 14.0903 14.0664 13.8169 14.4062 13.5356L14.6875 13.2974L14.9727 13.5356C15.125 13.6645 15.4141 13.852 15.6055 13.9458C16.1016 14.188 16.4687 14.2739 17.0312 14.2739C17.5937 14.2739 17.9648 14.188 18.457 13.9458C19.0273 13.6645 19.4258 13.2935 19.7734 12.7231C19.9766 12.3872 20.0039 12.1763 19.875 11.9536C19.7109 11.6724 19.3945 11.5864 19.1016 11.7349C18.9883 11.7934 18.9102 11.8833 18.793 12.0747C18.4102 12.7388 17.7812 13.102 17.0312 13.102C16.2812 13.102 15.6523 12.7388 15.2695 12.0747C14.9375 11.5083 14.4375 11.5083 14.1055 12.0747C13.7227 12.7388 13.0938 13.102 12.3438 13.102C11.5938 13.102 10.9648 12.7388 10.582 12.0747C10.25 11.5083 9.75 11.5083 9.41797 12.0747C9.03516 12.7388 8.40625 13.102 7.65625 13.102C6.90625 13.102 6.27734 12.7388 5.89453 12.0747C5.5625 11.5083 5.0625 11.5083 4.73047 12.0747C4.34766 12.7388 3.71875 13.102 2.96875 13.102C2.21875 13.102 1.58984 12.7388 1.20703 12.0747C0.976562 11.6841 0.671875 11.5591 0.351562 11.7309Z"
                      fill="white"
                    />
                    <path
                      d="M0.45341 14.6644C0.195598 14.7464 0.00809795 15.0472 0.0510667 15.3167C0.0901292 15.555 0.383098 15.9925 0.742473 16.344C1.27372 16.8675 1.85185 17.1487 2.60966 17.2464C3.47294 17.3558 4.4495 17.0472 5.09404 16.4573L5.31279 16.2581L5.53544 16.4612C6.012 16.887 6.62529 17.1605 7.29716 17.2464C8.16044 17.3558 9.137 17.0472 9.78154 16.4573L10.0003 16.2581L10.2229 16.4612C10.6995 16.887 11.3128 17.1605 11.9847 17.2464C12.8479 17.3558 13.8245 17.0472 14.469 16.4573L14.6878 16.2581L14.9104 16.4612C15.5745 17.055 16.5276 17.3558 17.3909 17.2464C18.1487 17.1487 18.7268 16.8675 19.2581 16.344C19.5862 16.0198 19.887 15.5862 19.9417 15.3558C20.012 15.0745 19.8089 14.7386 19.5237 14.6644C19.219 14.5823 19.0003 14.7073 18.7854 15.0823C18.5042 15.5706 17.9964 15.9339 17.4143 16.055C16.594 16.2308 15.719 15.8284 15.2737 15.0745C15.0745 14.7308 14.8518 14.594 14.5901 14.6409C14.4065 14.6761 14.2464 14.8206 14.0979 15.0823C13.8167 15.5706 13.3089 15.9339 12.7268 16.055C11.9065 16.2308 11.0315 15.8284 10.5862 15.0745C10.387 14.7308 10.1643 14.594 9.90263 14.6409C9.71904 14.6761 9.55888 14.8206 9.41044 15.0823C9.12919 15.5706 8.62138 15.9339 8.03935 16.055C7.21904 16.2308 6.34404 15.8284 5.89872 15.0745C5.6995 14.7308 5.47685 14.594 5.21513 14.6409C5.03154 14.6761 4.87138 14.8206 4.72294 15.0823C4.34794 15.7347 3.53935 16.1644 2.81279 16.0901C2.10575 16.0237 1.60966 15.6917 1.16044 15.0003C1.09013 14.8948 0.992473 14.7737 0.937785 14.7347C0.816692 14.6448 0.605754 14.6175 0.45341 14.6644Z"
                      fill="white"
                    />
                    <path
                      d="M0.324422 17.7109C0.0900473 17.8516 -0.0115152 18.125 0.0783286 18.3906C0.152547 18.6211 0.480672 19.082 0.750204 19.3359C1.53927 20.0898 2.57052 20.3906 3.61739 20.1758C4.17989 20.0586 4.73458 19.7734 5.12911 19.3945L5.3127 19.2187L5.5002 19.3945C6.03927 19.918 6.87911 20.25 7.65645 20.25C8.4338 20.25 9.27364 19.918 9.81661 19.3945L10.0002 19.2187L10.1877 19.3945C10.7268 19.918 11.5666 20.25 12.344 20.25C13.1213 20.25 13.9611 19.918 14.5041 19.3945L14.6877 19.2187L14.8752 19.3945C15.2658 19.7734 15.8205 20.0586 16.383 20.1758C17.4299 20.3906 18.4611 20.0898 19.2502 19.3359C19.5275 19.0742 19.8596 18.6055 19.926 18.375C20.0432 17.9844 19.7775 17.6328 19.3635 17.6328C19.1291 17.6328 18.969 17.75 18.7815 18.0625C18.3205 18.8398 17.4299 19.2227 16.5666 19.0195C16.0471 18.8945 15.5588 18.5312 15.2815 18.0625C15.094 17.7461 14.9377 17.6328 14.6877 17.6328C14.4377 17.6328 14.2815 17.7461 14.094 18.0625C13.633 18.8398 12.7424 19.2227 11.8791 19.0195C11.3596 18.8945 10.8713 18.5312 10.594 18.0625C10.4065 17.7461 10.2502 17.6328 10.0002 17.6328C9.7502 17.6328 9.59395 17.7461 9.40645 18.0625C8.94552 18.8398 8.05489 19.2227 7.19161 19.0195C6.67208 18.8945 6.1838 18.5312 5.90645 18.0625C5.71895 17.7461 5.5627 17.6328 5.3127 17.6328C5.0627 17.6328 4.90645 17.7461 4.71895 18.0625C4.25802 18.8398 3.36739 19.2227 2.50411 19.0195C1.98458 18.8945 1.4963 18.5312 1.21895 18.0625C1.13302 17.9219 1.00802 17.7695 0.937704 17.7187C0.773641 17.6094 0.500204 17.6016 0.324422 17.7109Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4690_15678">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.25)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <p class="txt_regular_16">
                  {{ convertExtreme(itemExtreme.state) }}
                </p>
              </div>
              <!--  -->
              <div class="w-[120px] text-center flex txt_regular_16">
                {{ formatDatetimeToVNConvert(itemExtreme.datetime) }}
              </div>
              <div class="w-[100px] text-right">
                <p class="txt_regular_16 text-right">
                  {{ formatUnitTide(itemExtreme.height) }}
                  {{ unitTide(tideDataRender?.unit) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  </div>
</template>
<script>
import BaseComponent from "@/components/common/baseComponent.vue";
import {
  convertFeetToMeter,
  convertMeterToFeet,
  formatDateLocalized,
  formatDateString,
  formatDateTimeGlobal,
  formatDatetimeToVN,
  formatDateToDDMM,
  formatTo12HourTimeTide,
  formatTo24HourTimeTide,
  getCurrentTimeISO,
} from "@/utils/converValue";
import { groupTidesFromToday, takeFirstNFromObject } from "@/utils/middleware";
import { mapGetters } from "vuex";
import ChartTideBarCurrent from "../chart-tide-bar/chart-tide-bar-current.vue";
import {
  formatDateTime12h,
  formatDateTime24h,
} from "../../../utils/converValue";
import Index from "@/views/index.vue";

export default {
  name: "today-chart-tide",
  components: {
    BaseComponent,
    ChartTideBarCurrent,
  },

  data() {
    return {
      heightAuto: "auto",
      activeIndex: 0,
      resultData: [],
      currentTideUnitIndex: 0, // 0: m, 1: ft
      tideInterval: null, // Lưu giữ ID của setInterval
    };
  },

  computed: {
    ...mapGetters("tideModule", [
      "tideDataGetters",
      "extremesDataGetters",
      "tideDataGetters",
    ]),

    extremesDataRender() {
      return this.extremesDataGetters;
    },

    tideDataRender() {
      return this.tideDataGetters;
    },

    languageParam() {
      const languageRouter = this.$route.params;

      return Object.keys(languageRouter).length !== 0
        ? languageRouter.language !== "en" && languageRouter.language !== "vi"
          ? "en"
          : languageRouter.language
        : this.$i18n.locale !== "en" && this.$i18n.locale !== "vi"
        ? "en"
        : this.$i18n.locale;
    },
  },

  methods: {
    convertTimeTideLive(data) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      if (unitSetting.activeTime_save === "12h") {
        return formatTo12HourTimeTide(data, true);
      } else {
        return formatTo24HourTimeTide(data, false);
      }
    },
    convertTimeRender() {
      const now = new Date();

      const data = this.extremesDataRender;
      if (!Array.isArray(data) || data.length < 3) {
        return null;
      }
      const currentDayNowFirst = data[0];
      const currentDayNowSecond = data[1];
      const currentDayNowThird = data[2];

      const first = new Date(currentDayNowFirst.datetime); // sáng
      const second = new Date(currentDayNowSecond.datetime); // chiều
      const third = new Date(currentDayNowThird.datetime); // sáng hôm sau

      if (now >= first && now <= second) {
        return currentDayNowSecond; // nằm giữa sáng và chiều
      } else if (now < first) {
        return currentDayNowFirst; // trước sáng → chọn sáng
      } else {
        return currentDayNowThird; // sau chiều → chọn sáng hôm sau
      }
    },
    formatDateLocalizedConvert(data) {
      return formatDateLocalized(data, this.languageParam);
    },
    formatDatetimeToVNConvert(data) {
      // return formatDatetimeToVN(data);

      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      if (unitSetting.activeTime_save === "12h") {
        return formatDateString(data, true);
      } else {
        return formatDateString(data, false);
      }
    },

    formatUnitTide(data) {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      if (unitSetting.activeTide_save === "m") {
        return convertFeetToMeter(data);
      } else {
        return convertMeterToFeet(data);
      }
    },

    formatSetIntervalTideHight(data) {
      const listUnitTide = ["m", "ft"];

      for (let i = 0; i < listUnitTide.length; i++) {
        const unitValue = listUnitTide[i];
        if (unitValue === "m") {
          const dataHeight = convertFeetToMeter(data) + " " + unitValue;
          this.resultData.push(dataHeight);
        } else if (unitValue === "ft") {
          // Chuyển đổi từ feet sang mét
          const dataHeight = convertMeterToFeet(data) + " " + unitValue;
          this.resultData.push(dataHeight);
        }
      }
      return this.resultData;
    },

    unitTide() {
      const unitSetting = this.$store.state.commonModule.objectSettingSave;

      return unitSetting.activeTide_save;
    },

    formatDateToDDMMConvert(data) {
      return formatDateToDDMM(data);
    },

    formatTideHeightSingle(value) {
      const unit = this.currentTideUnitIndex === 0 ? "m" : "ft"; // Kiểm tra đơn vị
      if (unit === "m") {
        return convertFeetToMeter(value) + " m"; // Chuyển từ ft sang m
      } else {
        return convertMeterToFeet(value) + " ft"; // Chuyển từ m sang ft
      }
    },

    convertExtreme(data) {
      if (data === "LOW TIDE") {
        return "Low Tide";
      } else {
        return "High Tide";
      }
    },
  },

  mounted() {
    this.tideInterval = setInterval(() => {
      // Đổi đơn vị giữa "m" và "ft" sau mỗi 10 giây
      this.currentTideUnitIndex = (this.currentTideUnitIndex + 1) % 2;
    }, 1000); // 10000ms = 10s
  },
};
</script>
<style lang="scss">
.bor-live {
  border-radius: 14px;
  background-color: rgb(75, 136, 227);
  padding: 3px 6px;
  top: 54px;
}

.button-rotate {
  cursor: pointer;
  -webkit-animation: glowing 1500ms infinite;
  -moz-animation: glowing 1500ms infinite;
  -o-animation: glowing 1500ms infinite;
  animation: glowing 1500ms infinite;
}

@-webkit-keyframes glowing {
  0% {
    background-color: #b20000;
    -webkit-box-shadow: 0 0 3px #b20000;
  }
  50% {
    background-color: #ff0000;
    -webkit-box-shadow: 0 0 40px #ff0000;
  }
  100% {
    background-color: #b20000;
    -webkit-box-shadow: 0 0 3px #b20000;
  }
}

@-moz-keyframes glowing {
  0% {
    background-color: #b20000;
    -moz-box-shadow: 0 0 3px #b20000;
  }
  50% {
    background-color: #ff0000;
    -moz-box-shadow: 0 0 40px #ff0000;
  }
  100% {
    background-color: #b20000;
    -moz-box-shadow: 0 0 3px #b20000;
  }
}

@-o-keyframes glowing {
  0% {
    background-color: #b20000;
    box-shadow: 0 0 3px #b20000;
  }
  50% {
    background-color: #ff0000;
    box-shadow: 0 0 40px #ff0000;
  }
  100% {
    background-color: #b20000;
    box-shadow: 0 0 3px #b20000;
  }
}

@keyframes glowing {
  0% {
    background-color: #b20000;
    box-shadow: 0 0 3px #b20000;
  }
  50% {
    background-color: #ff0000;
    box-shadow: 0 0 40px #ff0000;
  }
  100% {
    background-color: #b20000;
    box-shadow: 0 0 3px #b20000;
  }
}
</style>
