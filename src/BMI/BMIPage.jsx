import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class BMIPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feet: 0,
            inch: 0,
            weight: 0,
            bmi: 0
        };
        this.handleBmiChange = this.handleBmiChange.bind(this);
        this.calculateBMI = this.calculateBMI.bind(this);
    }

    handleBmiChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    calculateBMI() {
        const height = (Number(this.state.feet) * 12) + Number(this.state.inch);
        let bmi = Number(this.state.weight) / (height * height);
        bmi = 703 * bmi;
        this.setState({ bmi: bmi });
    }

    render() {
        return (<div>
            <Link to="/home" className="btn btn-info">Back</Link>
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="col-md-6 col-md-offset-3">
                            <h2>BMI Calculator</h2>
                            <div className='form-group'>
                                <div className='row'>
                                    <label>Height</label>
                                    <div className='row'>
                                        <div className='col-md-5'>
                                            <label>Feet</label>
                                            <input type="number" className='form-control' name="feet" onChange={this.handleBmiChange} value={this.state.feet} />
                                        </div>
                                        <div className='col-md-5'>
                                            <label>Inches</label>
                                            <input type="number" className='form-control' name="inch" onChange={this.handleBmiChange} value={this.state.inch} />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <label>Weight</label>
                                    <input type="number" className='form-control' name="weight" onChange={this.handleBmiChange} value={this.state.weight} />
                                </div>
                                <div className='row' style={{ marginTop: "10px" }}>
                                    <button className='btn btn-info' onClick={this.calculateBMI}>Calculate</button>
                                    <label style={{ paddingLeft: "20px" }}>BMI:</label> <span>{this.state.bmi}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
            <table width="100%" summary="Body Mass Index Reference Table Page 1 of 2" className='container table'>

                <thead> <tr valign="bottom">
                    <th align="right" id="un_0">BMI</th>
                    <th align="right" id="un_1" abbr="BMI 19">19</th>
                    <th align="right" id="un_2" abbr="BMI 20">20</th>
                    <th align="right" id="un_3" abbr="BMI 21">21</th>
                    <th align="right" id="un_4" abbr="BMI 22">22</th>
                    <th align="right" id="un_5" abbr="BMI 23">23</th>
                    <th align="right" id="un_6" abbr="BMI 24">24</th>
                    <th align="right" id="un_7" abbr="BMI 25">25</th>
                    <th align="right" id="un_8" abbr="BMI 26">26</th>
                    <th align="right" id="un_9" abbr="BMI 27">27</th>
                    <th align="right" id="un_10" abbr="BMI 28">28</th>
                    <th align="right" id="un_11" abbr="BMI 29">29</th>
                    <th align="right" id="un_12" abbr="BMI 30">30</th>
                    <th align="right" id="un_13" abbr="BMI 31">31</th>
                    <th align="right" id="un_14" abbr="BMI 32">32</th>
                    <th align="right" id="un_15" abbr="BMI 33">33</th>
                    <th align="right" id="un_16" abbr="BMI 34">34</th>
                    <th align="right" id="un_17" abbr="BMI 35">35</th>
                </tr>
                    <tr valign="middle">
                        <th align="center" id="un_18" headers="un_0"><b>Height (inches)</b></th>
                        <th colspan="17" align="CENTER"><b>Body Weight (pounds)</b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr valign="bottom">
                        <th align="center" id="un_20" headers="un_18" abbr="58 inches tall">58</th>
                        <td align="RIGHT" headers="un_20 un_1 ">91</td>
                        <td align="right" headers="un_20 un_2 ">96</td>
                        <td align="right" headers="un_20 un_3 ">100</td>
                        <td align="right" headers="un_20 un_4 ">105</td>
                        <td align="right" headers="un_20 un_5 ">110</td>
                        <td align="right" headers="un_20 un_6 ">115</td>
                        <td align="right" headers="un_20 un_7 ">119</td>
                        <td align="right" headers="un_20 un_8 ">124</td>
                        <td align="right" headers="un_20 un_9 ">129</td>
                        <td align="right" headers="un_20 un_10 ">134</td>
                        <td align="right" headers="un_20 un_11 ">138</td>
                        <td align="right" headers="un_20 un_12 ">143</td>
                        <td align="right" headers="un_20 un_13 ">148</td>
                        <td align="right" headers="un_20 un_14 ">153</td>
                        <td align="right" headers="un_20 un_15 ">158</td>
                        <td align="right" headers="un_20 un_16 ">162</td>
                        <td align="right" headers="un_20 un_17 ">167</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_21" headers="un_18" abbr="59 inches tall">59</th>
                        <td align="right" headers="un_21 un_1 ">94</td>
                        <td align="right" headers="un_21 un_2 ">99</td>
                        <td align="right" headers="un_21 un_3 ">104</td>
                        <td align="right" headers="un_21 un_4 ">109</td>
                        <td align="right" headers="un_21 un_5 ">114</td>
                        <td align="right" headers="un_21 un_6 ">119</td>
                        <td align="right" headers="un_21 un_7 ">124</td>
                        <td align="right" headers="un_21 un_8 ">128</td>
                        <td align="right" headers="un_21 un_9 ">133</td>
                        <td align="right" headers="un_21 un_10 ">138</td>
                        <td align="right" headers="un_21 un_11 ">143</td>
                        <td align="right" headers="un_21 un_12 ">148</td>
                        <td align="right" headers="un_21 un_13 ">153</td>
                        <td align="right" headers="un_21 un_14 ">158</td>
                        <td align="right" headers="un_21 un_15 ">163</td>
                        <td align="right" headers="un_21 un_16 ">168</td>
                        <td align="right" headers="un_21 un_17 ">173</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_22" headers="un_18" abbr="60 inches tall">60</th>
                        <td align="right" headers="un_22 un_1 ">97</td>
                        <td align="right" headers="un_22 un_2 ">102</td>
                        <td align="right" headers="un_22 un_3 ">107</td>
                        <td align="right" headers="un_22 un_4 ">112</td>
                        <td align="right" headers="un_22 un_5 ">118</td>
                        <td align="right" headers="un_22 un_6 ">123</td>
                        <td align="right" headers="un_22 un_7 ">128</td>
                        <td align="right" headers="un_22 un_8 ">133</td>
                        <td align="right" headers="un_22 un_9 ">138</td>
                        <td align="right" headers="un_22 un_10 ">143</td>
                        <td align="right" headers="un_22 un_11 ">148</td>
                        <td align="right" headers="un_22 un_12 ">153</td>
                        <td align="right" headers="un_22 un_13 ">158</td>
                        <td align="right" headers="un_22 un_14 ">163</td>
                        <td align="right" headers="un_22 un_15 ">168</td>
                        <td align="right" headers="un_22 un_16 ">174</td>
                        <td align="right" headers="un_22 un_17 ">179</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_23" headers="un_18" abbr="61 inches tall">61</th>
                        <td align="right" headers="un_23 un_1 ">100</td>
                        <td align="right" headers="un_23 un_2 ">106</td>
                        <td align="right" headers="un_23 un_3 ">111</td>
                        <td align="right" headers="un_23 un_4 ">116</td>
                        <td align="right" headers="un_23 un_5 ">122</td>
                        <td align="right" headers="un_23 un_6 ">127</td>
                        <td align="right" headers="un_23 un_7 ">132</td>
                        <td align="right" headers="un_23 un_8 ">137</td>
                        <td align="right" headers="un_23 un_9 ">143</td>
                        <td align="right" headers="un_23 un_10 ">148</td>
                        <td align="right" headers="un_23 un_11 ">153</td>
                        <td align="right" headers="un_23 un_12 ">158</td>
                        <td align="right" headers="un_23 un_13 ">164</td>
                        <td align="right" headers="un_23 un_14 ">169</td>
                        <td align="right" headers="un_23 un_15 ">174</td>
                        <td align="right" headers="un_23 un_16 ">180</td>
                        <td align="right" headers="un_23 un_17 ">185</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_24" headers="un_18" abbr="62 inches tall">62</th>
                        <td align="right" headers="un_24 un_1 ">104</td>
                        <td align="right" headers="un_24 un_2 ">109</td>
                        <td align="right" headers="un_24 un_3 ">115</td>
                        <td align="right" headers="un_24 un_4 ">120</td>
                        <td align="right" headers="un_24 un_5 ">126</td>
                        <td align="right" headers="un_24 un_6 ">131</td>
                        <td align="right" headers="un_24 un_7 ">136</td>
                        <td align="right" headers="un_24 un_8 ">142</td>
                        <td align="right" headers="un_24 un_9 ">147</td>
                        <td align="right" headers="un_24 un_10 ">153</td>
                        <td align="right" headers="un_24 un_11 ">158</td>
                        <td align="right" headers="un_24 un_12 ">164</td>
                        <td align="right" headers="un_24 un_13 ">169</td>
                        <td align="right" headers="un_24 un_14 ">175</td>
                        <td align="right" headers="un_24 un_15 ">180</td>
                        <td align="right" headers="un_24 un_16 ">186</td>
                        <td align="right" headers="un_24 un_17 ">191</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_25" headers="un_18" abbr="63 inches tall">63</th>
                        <td align="right" headers="un_25 un_1 ">107</td>
                        <td align="right" headers="un_25 un_2 ">113</td>
                        <td align="right" headers="un_25 un_3 ">118</td>
                        <td align="right" headers="un_25 un_4 ">124</td>
                        <td align="right" headers="un_25 un_5 ">130</td>
                        <td align="right" headers="un_25 un_6 ">135</td>
                        <td align="right" headers="un_25 un_7 ">141</td>
                        <td align="right" headers="un_25 un_8 ">146</td>
                        <td align="right" headers="un_25 un_9 ">152</td>
                        <td align="right" headers="un_25 un_10 ">158</td>
                        <td align="right" headers="un_25 un_11 ">163</td>
                        <td align="right" headers="un_25 un_12 ">169</td>
                        <td align="right" headers="un_25 un_13 ">175</td>
                        <td align="right" headers="un_25 un_14 ">180</td>
                        <td align="right" headers="un_25 un_15 ">186</td>
                        <td align="right" headers="un_25 un_16 ">191</td>
                        <td align="right" headers="un_25 un_17 ">197</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_26" headers="un_18" abbr="64 inches tall">64</th>
                        <td align="right" headers="un_26 un_1 ">110</td>
                        <td align="right" headers="un_26 un_2 ">116</td>
                        <td align="right" headers="un_26 un_3 ">122</td>
                        <td align="right" headers="un_26 un_4 ">128</td>
                        <td align="right" headers="un_26 un_5 ">134</td>
                        <td align="right" headers="un_26 un_6 ">140</td>
                        <td align="right" headers="un_26 un_7 ">145</td>
                        <td align="right" headers="un_26 un_8 ">151</td>
                        <td align="right" headers="un_26 un_9 ">157</td>
                        <td align="right" headers="un_26 un_10 ">163</td>
                        <td align="right" headers="un_26 un_11 ">169</td>
                        <td align="right" headers="un_26 un_12 ">174</td>
                        <td align="right" headers="un_26 un_13 ">180</td>
                        <td align="right" headers="un_26 un_14 ">186</td>
                        <td align="right" headers="un_26 un_15 ">192</td>
                        <td align="right" headers="un_26 un_16 ">197</td>
                        <td align="right" headers="un_26 un_17 ">204</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_27" headers="un_18" abbr="65 inches tall">65</th>
                        <td align="right" headers="un_27 un_1 ">114</td>
                        <td align="right" headers="un_27 un_2 ">120</td>
                        <td align="right" headers="un_27 un_3 ">126</td>
                        <td align="right" headers="un_27 un_4 ">132</td>
                        <td align="right" headers="un_27 un_5 ">138</td>
                        <td align="right" headers="un_27 un_6 ">144</td>
                        <td align="right" headers="un_27 un_7 ">150</td>
                        <td align="right" headers="un_27 un_8 ">156</td>
                        <td align="right" headers="un_27 un_9 ">162</td>
                        <td align="right" headers="un_27 un_10 ">168</td>
                        <td align="right" headers="un_27 un_11 ">174</td>
                        <td align="right" headers="un_27 un_12 ">180</td>
                        <td align="right" headers="un_27 un_13 ">186</td>
                        <td align="right" headers="un_27 un_14 ">192</td>
                        <td align="right" headers="un_27 un_15 ">198</td>
                        <td align="right" headers="un_27 un_16 ">204</td>
                        <td align="right" headers="un_27 un_17 ">210</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_28" headers="un_18" abbr="66 inches tall">66</th>
                        <td align="right" headers="un_28 un_1 ">118</td>
                        <td align="right" headers="un_28 un_2 ">124</td>
                        <td align="right" headers="un_28 un_3 ">130</td>
                        <td align="right" headers="un_28 un_4 ">136</td>
                        <td align="right" headers="un_28 un_5 ">142</td>
                        <td align="right" headers="un_28 un_6 ">148</td>
                        <td align="right" headers="un_28 un_7 ">155</td>
                        <td align="right" headers="un_28 un_8 ">161</td>
                        <td align="right" headers="un_28 un_9 ">167</td>
                        <td align="right" headers="un_28 un_10 ">173</td>
                        <td align="right" headers="un_28 un_11 ">179</td>
                        <td align="right" headers="un_28 un_12 ">186</td>
                        <td align="right" headers="un_28 un_13 ">192</td>
                        <td align="right" headers="un_28 un_14 ">198</td>
                        <td align="right" headers="un_28 un_15 ">204</td>
                        <td align="right" headers="un_28 un_16 ">210</td>
                        <td align="right" headers="un_28 un_17 ">216</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_29" headers="un_18" abbr="67 inches tall">67</th>
                        <td align="right" headers="un_29 un_1 ">121</td>
                        <td align="right" headers="un_29 un_2 ">127</td>
                        <td align="right" headers="un_29 un_3 ">134</td>
                        <td align="right" headers="un_29 un_4 ">140</td>
                        <td align="right" headers="un_29 un_5 ">146</td>
                        <td align="right" headers="un_29 un_6 ">153</td>
                        <td align="right" headers="un_29 un_7 ">159</td>
                        <td align="right" headers="un_29 un_8 ">166</td>
                        <td align="right" headers="un_29 un_9 ">172</td>
                        <td align="right" headers="un_29 un_10 ">178</td>
                        <td align="right" headers="un_29 un_11 ">185</td>
                        <td align="right" headers="un_29 un_12 ">191</td>
                        <td align="right" headers="un_29 un_13 ">198</td>
                        <td align="right" headers="un_29 un_14 ">204</td>
                        <td align="right" headers="un_29 un_15 ">211</td>
                        <td align="right" headers="un_29 un_16 ">217</td>
                        <td align="right" headers="un_29 un_17 ">223</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_30" headers="un_18" abbr="68 inches tall">68</th>
                        <td align="right" headers="un_30 un_1 ">125</td>
                        <td align="right" headers="un_30 un_2 ">131</td>
                        <td align="right" headers="un_30 un_3 ">138</td>
                        <td align="right" headers="un_30 un_4 ">144</td>
                        <td align="right" headers="un_30 un_5 ">151</td>
                        <td align="right" headers="un_30 un_6 ">158</td>
                        <td align="right" headers="un_30 un_7 ">164</td>
                        <td align="right" headers="un_30 un_8 ">171</td>
                        <td align="right" headers="un_30 un_9 ">177</td>
                        <td align="right" headers="un_30 un_10 ">184</td>
                        <td align="right" headers="un_30 un_11 ">190</td>
                        <td align="right" headers="un_30 un_12 ">197</td>
                        <td align="right" headers="un_30 un_13 ">203</td>
                        <td align="right" headers="un_30 un_14 ">210</td>
                        <td align="right" headers="un_30 un_15 ">216</td>
                        <td align="right" headers="un_30 un_16 ">223</td>
                        <td align="right" headers="un_30 un_17 ">230</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_31" headers="un_18" abbr="69 inches tall">69</th>
                        <td align="right" headers="un_31 un_1 ">128</td>
                        <td align="right" headers="un_31 un_2 ">135</td>
                        <td align="right" headers="un_31 un_3 ">142</td>
                        <td align="right" headers="un_31 un_4 ">149</td>
                        <td align="right" headers="un_31 un_5 ">155</td>
                        <td align="right" headers="un_31 un_6 ">162</td>
                        <td align="right" headers="un_31 un_7 ">169</td>
                        <td align="right" headers="un_31 un_8 ">176</td>
                        <td align="right" headers="un_31 un_9 ">182</td>
                        <td align="right" headers="un_31 un_10 ">189</td>
                        <td align="right" headers="un_31 un_11 ">196</td>
                        <td align="right" headers="un_31 un_12 ">203</td>
                        <td align="right" headers="un_31 un_13 ">209</td>
                        <td align="right" headers="un_31 un_14 ">216</td>
                        <td align="right" headers="un_31 un_15 ">223</td>
                        <td align="right" headers="un_31 un_16 ">230</td>
                        <td align="right" headers="un_31 un_17 ">236</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_32" headers="un_18" abbr="70 inches tall">70</th>
                        <td align="right" headers="un_32 un_1 ">132</td>
                        <td align="right" headers="un_32 un_2 ">139</td>
                        <td align="right" headers="un_32 un_3 ">146</td>
                        <td align="right" headers="un_32 un_4 ">153</td>
                        <td align="right" headers="un_32 un_5 ">160</td>
                        <td align="right" headers="un_32 un_6 ">167</td>
                        <td align="right" headers="un_32 un_7 ">174</td>
                        <td align="right" headers="un_32 un_8 ">181</td>
                        <td align="right" headers="un_32 un_9 ">188</td>
                        <td align="right" headers="un_32 un_10 ">195</td>
                        <td align="right" headers="un_32 un_11 ">202</td>
                        <td align="right" headers="un_32 un_12 ">209</td>
                        <td align="right" headers="un_32 un_13 ">216</td>
                        <td align="right" headers="un_32 un_14 ">222</td>
                        <td align="right" headers="un_32 un_15 ">229</td>
                        <td align="right" headers="un_32 un_16 ">236</td>
                        <td align="right" headers="un_32 un_17 ">243</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_33" headers="un_18" abbr="71 inches tall">71</th>
                        <td align="right" headers="un_33 un_1 ">136</td>
                        <td align="right" headers="un_33 un_2 ">143</td>
                        <td align="right" headers="un_33 un_3 ">150</td>
                        <td align="right" headers="un_33 un_4 ">157</td>
                        <td align="right" headers="un_33 un_5 ">165</td>
                        <td align="right" headers="un_33 un_6 ">172</td>
                        <td align="right" headers="un_33 un_7 ">179</td>
                        <td align="right" headers="un_33 un_8 ">186</td>
                        <td align="right" headers="un_33 un_9 ">193</td>
                        <td align="right" headers="un_33 un_10 ">200</td>
                        <td align="right" headers="un_33 un_11 ">208</td>
                        <td align="right" headers="un_33 un_12 ">215</td>
                        <td align="right" headers="un_33 un_13 ">222</td>
                        <td align="right" headers="un_33 un_14 ">229</td>
                        <td align="right" headers="un_33 un_15 ">236</td>
                        <td align="right" headers="un_33 un_16 ">243</td>
                        <td align="right" headers="un_33 un_17 ">250</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_34" headers="un_18" abbr="72 inches tall">72</th>
                        <td align="right" headers="un_34 un_1 ">140</td>
                        <td align="right" headers="un_34 un_2 ">147</td>
                        <td align="right" headers="un_34 un_3 ">154</td>
                        <td align="right" headers="un_34 un_4 ">162</td>
                        <td align="right" headers="un_34 un_5 ">169</td>
                        <td align="right" headers="un_34 un_6 ">177</td>
                        <td align="right" headers="un_34 un_7 ">184</td>
                        <td align="right" headers="un_34 un_8 ">191</td>
                        <td align="right" headers="un_34 un_9 ">199</td>
                        <td align="right" headers="un_34 un_10 ">206</td>
                        <td align="right" headers="un_34 un_11 ">213</td>
                        <td align="right" headers="un_34 un_12 ">221</td>
                        <td align="right" headers="un_34 un_13 ">228</td>
                        <td align="right" headers="un_34 un_14 ">235</td>
                        <td align="right" headers="un_34 un_15 ">242</td>
                        <td align="right" headers="un_34 un_16 ">250</td>
                        <td align="right" headers="un_34 un_17 ">258</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_35" headers="un_18" abbr="73 inches tall">73</th>
                        <td align="right" headers="un_35 un_1 ">144</td>
                        <td align="right" headers="un_35 un_2 ">151</td>
                        <td align="right" headers="un_35 un_3 ">159</td>
                        <td align="right" headers="un_35 un_4 ">166</td>
                        <td align="right" headers="un_35 un_5 ">174</td>
                        <td align="right" headers="un_35 un_6 ">182</td>
                        <td align="right" headers="un_35 un_7 ">189</td>
                        <td align="right" headers="un_35 un_8 ">197</td>
                        <td align="right" headers="un_35 un_9 ">204</td>
                        <td align="right" headers="un_35 un_10 ">212</td>
                        <td align="right" headers="un_35 un_11 ">219</td>
                        <td align="right" headers="un_35 un_12 ">227</td>
                        <td align="right" headers="un_35 un_13 ">235</td>
                        <td align="right" headers="un_35 un_14 ">242</td>
                        <td align="right" headers="un_35 un_15 ">250</td>
                        <td align="right" headers="un_35 un_16 ">257</td>
                        <td align="right" headers="un_35 un_17 ">265</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_36" headers="un_18" abbr="74 inches tall">74</th>
                        <td align="right" headers="un_36 un_1 ">148</td>
                        <td align="right" headers="un_36 un_2 ">155</td>
                        <td align="right" headers="un_36 un_3 ">163</td>
                        <td align="right" headers="un_36 un_4 ">171</td>
                        <td align="right" headers="un_36 un_5 ">179</td>
                        <td align="right" headers="un_36 un_6 ">186</td>
                        <td align="right" headers="un_36 un_7 ">194</td>
                        <td align="right" headers="un_36 un_8 ">202</td>
                        <td align="right" headers="un_36 un_9 ">210</td>
                        <td align="right" headers="un_36 un_10 ">218</td>
                        <td align="right" headers="un_36 un_11 ">225</td>
                        <td align="right" headers="un_36 un_12 ">233</td>
                        <td align="right" headers="un_36 un_13 ">241</td>
                        <td align="right" headers="un_36 un_14 ">249</td>
                        <td align="right" headers="un_36 un_15 ">256</td>
                        <td align="right" headers="un_36 un_16 ">264</td>
                        <td align="right" headers="un_36 un_17 ">272</td>
                    </tr>
                    <tr valign="bottom">
                        <th align="center" id="un_37" headers="un_18" abbr="75 inches tall">75</th>
                        <td align="right" headers="un_37 un_1 ">152</td>
                        <td align="right" headers="un_37 un_2 ">160</td>
                        <td align="right" headers="un_37 un_3 ">168</td>
                        <td align="right" headers="un_37 un_4 ">176</td>
                        <td align="right" headers="un_37 un_5 ">184</td>
                        <td align="right" headers="un_37 un_6 ">192</td>
                        <td align="right" headers="un_37 un_7 ">200</td>
                        <td align="right" headers="un_37 un_8 ">208</td>
                        <td align="right" headers="un_37 un_9 ">216</td>
                        <td align="right" headers="un_37 un_10 ">224</td>
                        <td align="right" headers="un_37 un_11 ">232</td>
                        <td align="right" headers="un_37 un_12 ">240</td>
                        <td align="right" headers="un_37 un_13 ">248</td>
                        <td align="right" headers="un_37 un_14 ">256</td>
                        <td align="right" headers="un_37 un_15 ">264</td>
                        <td align="right" headers="un_37 un_16 ">272</td>
                        <td align="right" headers="un_37 un_17 ">279</td>
                    </tr>
                    <tr valign="middle">
                        <th align="center" id="un_38" headers="un_18" abbr="76 inches tall">76</th>
                        <td align="right" headers="un_38 un_1 ">156</td>
                        <td align="right" headers="un_38 un_2 ">164</td>
                        <td align="right" headers="un_38 un_3 ">172</td>
                        <td align="right" headers="un_38 un_4 ">180</td>
                        <td align="right" headers="un_38 un_5 ">189</td>
                        <td align="right" headers="un_38 un_6 ">197</td>
                        <td align="right" headers="un_38 un_7 ">205</td>
                        <td align="right" headers="un_38 un_8 ">213</td>
                        <td align="right" headers="un_38 un_9 ">221</td>
                        <td align="right" headers="un_38 un_10 ">230</td>
                        <td align="right" headers="un_38 un_11 ">238</td>
                        <td align="right" headers="un_38 un_12 ">246</td>
                        <td align="right" headers="un_38 un_13 ">254</td>
                        <td align="right" headers="un_38 un_14 ">263</td>
                        <td align="right" headers="un_38 un_15 ">271</td>
                        <td align="right" headers="un_38 un_16 ">279</td>
                        <td align="right" headers="un_38 un_17 ">287</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedBMIPage = connect(mapState, actionCreators)(BMIPage);
export { connectedBMIPage as BMIPage };